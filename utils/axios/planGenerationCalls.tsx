import { instance } from ".";
import { FrontendPlan, BackendPlan, RecipeSwipeObject, smallIngredient } from "../dataTypes";

export const createPlan = async (portions: number[], leftovers: smallIngredient[], preferences: number[]): Promise<FrontendPlan> => {
    // Input parsing to JSON strings
    let portionsArg: string = JSON.stringify(portions)
    let leftoverArg: string = JSON.stringify(leftovers)
    let preferencesArg: string = JSON.stringify(preferences)

    try {
        // Create a new Plan API
        const response = await instance.get(
            '/plan/create',
            {
                headers: {
                    'Portions': portionsArg,
                    'Leftovers': leftoverArg,
                    'Preferences': preferencesArg
                }
            })

        // Extract data and parse results into FrontendPlan Object
        let initialPlan: BackendPlan = response.data

        const recipeSwipeObjects: RecipeSwipeObject[] = []

        initialPlan.meals.forEach((meal: any, idx: number) => {
            recipeSwipeObjects.push(
                new RecipeSwipeObject(
                    idx,
                    meal.recipe,
                    meal.portion
                )
            )
        })

        return { recipeSwipeObjects: recipeSwipeObjects, sustainabilityScore: initialPlan.sustainabilityScore }
    } catch (error) {
        // Call erroneous
        console.warn("[createPlan]", error)
    }
    return { recipeSwipeObjects: [], sustainabilityScore: 0 }
}

export const swipeleft = async (currentList: RecipeSwipeObject[], mealID: number): Promise<FrontendPlan> => {
    const result = currentList.map((x) => x)
    try {
        // Get Plan with old Recipe API
        const response = await instance.put(
            '/plan/swipeleft',
            {},
            {
                headers: {
                    'Slot': mealID.toString()
                }
            }
        )
        // Extract data and parse new recipe by swapping into previous plan
        let newPlan: BackendPlan = response.data
        result[mealID].swapRecipe(newPlan.meals[mealID].recipe)
        return { recipeSwipeObjects: result, sustainabilityScore: newPlan.sustainabilityScore } as FrontendPlan
    } catch (error) {
        console.warn("[swipeleft]", error)
    }
    // Send Previous plan (Sustainability Score?)
    return { recipeSwipeObjects: currentList, sustainabilityScore: 0 } as FrontendPlan
}

export const swiperight = async (currentList: RecipeSwipeObject[], mealID: number): Promise<FrontendPlan> => {
    const result = currentList.map((x) => x)
    try {
        // Get Plan with new Recipe API
        const response = await instance.put(
            '/plan/swiperight',
            {},
            {
                headers: {
                    'Slot': mealID.toString()
                }
            }
        )

        // Extract data and parse new recipe by swapping into previous plan
        let newPlan: BackendPlan = response.data
        result[mealID].swapRecipe(newPlan.meals[mealID].recipe)
        return { recipeSwipeObjects: result, sustainabilityScore: newPlan.sustainabilityScore } as FrontendPlan
    } catch (error) {
        // Call erroneous
        console.warn("[swiperight]", error)
    }
    // Send Previous plan (Sustainability Score?)
    return { recipeSwipeObjects: currentList, sustainabilityScore: 0 } as FrontendPlan
}