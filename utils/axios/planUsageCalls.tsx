import { backend } from "./config";
import { Recipe, BackendPlan, Meal } from "../dataTypes";

export const recipes = async (): Promise<Recipe[]> => {
    try {
        const response = await backend.get(
            '/recipes'
        )

        if (response.status = 200) {
            // Extract data and parse results into Ingredient Array
            let recipes: Recipe[] = response.data
            return recipes
        }
        console.error("Call Recipes aborted!")

    } catch (error) {
        console.error(error)
    }
    return [] as Recipe[]
}

export const plan = async (): Promise<Meal[]> => {
    try {
        const response = await backend.get(
            '/plan'
        )

        if (response.status = 200) {
            // Extract data and parse results into Meal Array
            let plan: BackendPlan = response.data
            const meals: Meal[] = []
            let i: number = 0
            while (i < plan.meals.length) {
                meals.push(
                    {
                        id: i,
                        recipe: plan.meals[i].recipe,
                        portions: plan.meals[i].portion
                    } as Meal
                )
                i += 1
            }
            return meals
        }
        console.error("Call Recipes aborted!")

    } catch (error) {
        console.error(error)
    }
    return [] as Meal[]
}

export const planCook = async (recipeID: number): Promise<Meal[]> => {
    let recipeArg = JSON.stringify(recipeID)
    try {
        const response = await backend.put(
            '/plan/cook',
            {},
            {
                headers: {
                    'recipe': recipeArg
                }
            }
        )

        if (response.status = 200) {
            // Extract data and parse results into Meal Array
            let plan: BackendPlan = response.data
            const meals: Meal[] = []
            let i: number = 0
            while (i < plan.meals.length) {
                meals.push(
                    {
                        id: i,
                        recipe: plan.meals[i].recipe,
                        portions: plan.meals[i].portion
                    } as Meal
                )
                i += 1
            }
            return meals
        }
        console.error("Call planCook aborted!")

    } catch (error) {
        console.error(error)
    }
    return [] as Meal[]
}