import { backend } from "./config";
import { Recipe, FrontendPlan, BackendPlan, RecipeSwipeObject } from "../dataTypes";

export const createPlan = async (portions: number[], leftovers: string[], preferences: string[]): Promise<FrontendPlan> => {
    // Input parsing to JSON strings
    let portionsArg: string = JSON.stringify(portions)
    let leftoverArg: string = JSON.stringify(leftovers)
    let preferencesArg: string = JSON.stringify(preferences)

    try {
        // Create a new Plan API
        const response = await backend.get(
            '/plan/create',
            {
                headers: {
                    'Portions': portionsArg,
                    'Leftovers': leftoverArg,
                    'Preferences': preferencesArg
                }
            })

        if (response.status = 200) {

            // Extract data and parse results into FrontendPlan Object
            let initialPlan: BackendPlan = response.data

            const recipeSwipeObjects: RecipeSwipeObject[] = []
            let i: number = 0
            while (i < initialPlan.meals.length) {
                recipeSwipeObjects.push(
                    new RecipeSwipeObject(
                        i,
                        initialPlan.meals[i].recipe,
                        initialPlan.meals[i].portion
                    )
                )
                i += 1
            }
            return { recipeSwipeObjects: recipeSwipeObjects, sustainabilityScore: initialPlan.sustainabilityScore }
        }
        console.error("Call CreatePlan aborted!")
    } catch (error) {
        // Call erroneous
        console.error(error)
    }
    return { recipeSwipeObjects: [], sustainabilityScore: 0 }
}

export const swipeleft = async (currentList: RecipeSwipeObject[], mealID: number): Promise<FrontendPlan> => {
    const result = currentList.map((x) => x)
    try {
        // Get Plan with old Recipe API
        const response = await backend.get(
            '/plan/swipeleft',
            {
                headers: {
                    'Slot': mealID.toString()
                }
            }
        )
        if (response.status = 200){

        // Extract data and parse new recipe by swapping into previous plan
        let newPlan: BackendPlan = response.data
        result[mealID].swapRecipe(newPlan.meals[mealID].recipe)
        return { recipeSwipeObjects: result, sustainabilityScore: newPlan.sustainabilityScore } as FrontendPlan
        }
        console.error("Call SwipeLeft aborted!")
    } catch (error) {
        console.error(error)
    }
    // Send Previous plan (Sustainability Score?)
    return { recipeSwipeObjects: currentList, sustainabilityScore: 0 } as FrontendPlan
}

export const swiperight = async (currentList: RecipeSwipeObject[], mealID: number): Promise<FrontendPlan> => {
    const result = currentList.map((x) => x)
    try {
        // Get Plan with new Recipe API
        const response = await backend.get(
            '/plan/swiperight',
            {
                headers: {
                    'Slot': mealID.toString()
                }
            }
        )

        if (response.status = 200){
        // Extract data and parse new recipe by swapping into previous plan
        let newPlan: BackendPlan = response.data
        result[mealID].swapRecipe(newPlan.meals[mealID].recipe)
        return { recipeSwipeObjects: result, sustainabilityScore: newPlan.sustainabilityScore } as FrontendPlan
        }
        console.error("Call SwipeRight aborted!")
    } catch (error) {
        // Call erroneous
        console.error(error)
    }
    // Send Previous plan (Sustainability Score?)
    return { recipeSwipeObjects: currentList, sustainabilityScore: 0 } as FrontendPlan
}

export const acceptPlan = async () => {
    try {
        const response = await backend.get(
            '/plan/accept'
        )
    } catch (error) {
        // Call erroneous
        console.error(error)
    }
}