import { backend } from "./config";
import { Recipe, FrontendPlan, BackendPlan, RecipeSwipeObject } from "../dataTypes";

export const createPlan = async (portions: number[], leftovers: string[], preferences: string[]): Promise<FrontendPlan> => {
    // Input parsing to JSON strings
    let portionsArg: string = JSON.stringify(portions)
    let leftoverArg: string = JSON.stringify(leftovers)
    let preferencesArg: string = JSON.stringify(preferences)

    // Call
    try {
        const response = await backend.get(
            '/plan/create',
            {
                headers: {
                    'accept': 'application/json',
                    'Portions': portionsArg,
                    'Leftovers': leftoverArg,
                    'Preferences': preferencesArg
                }
            })

        if (response.status != 200) {

        }

        let initialPlan: BackendPlan = response.data

        const recipeSwipeObjects: RecipeSwipeObject[] = []
        let i: number = 0
        while (i < initialPlan.recipes.length) {
            recipeSwipeObjects.push(
                new RecipeSwipeObject(
                    i,
                    initialPlan.recipes[i].recipe,
                    portions[i]
                )
            )
            i += 1
        }
        return { recipeSwipeObjects: recipeSwipeObjects, sustainabilityScore: initialPlan.sustainabilityScore }

    } catch (error) {
        console.error(error)
        return {} as FrontendPlan
    }
}

export const swipeLeft = async (currentList: RecipeSwipeObject[], mealID: number): Promise<FrontendPlan> => {
    const result = currentList.map((x) => x)
    try {
        const response = await backend.get(
            '/swipeleft',
            {
                headers: {
                    'Slot': mealID.toString()
                }
            }
        )

        let newPlan : BackendPlan = response.data
        result[mealID].swapRecipe(newPlan.recipes[mealID].recipe)
        return { recipeSwipeObjects: result, sustainabilityScore: newPlan.sustainabilityScore }
    } catch (error) {
        console.error(error)
        return {} as FrontendPlan
    }
}

export const swipeRight = async (currentList: RecipeSwipeObject[], mealID: number): Promise<FrontendPlan> => {
    const result = currentList.map((x) => x)
    try {
        const response = await backend.get(
            '/swiperight',
            {
                headers: {
                    'Slot': mealID.toString()
                }
            }
        )

        let newPlan : BackendPlan = response.data
        result[mealID].swapRecipe(newPlan.recipes[mealID].recipe)
        return { recipeSwipeObjects: result, sustainabilityScore: newPlan.sustainabilityScore }
    } catch (error) {
        console.error(error)
        return {} as FrontendPlan
    }
}

export const acceptPlan = async (currentList: RecipeSwipeObject[]) => {
    try{
        const response = await backend.get(
            '/plan/accept'
        )
    }catch(error){
        console.error(error)
    }
}