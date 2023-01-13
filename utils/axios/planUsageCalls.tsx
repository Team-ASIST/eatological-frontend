import { instance } from ".";
import { Recipe, BackendPlan, Meal } from "../dataTypes";

export const recipes = async (): Promise<Recipe[]> => {
    try {
        const response = await instance.get(
            '/recipes'
        )

        if (response.status = 200) {
            // Extract data and parse results into Ingredient Array
            let recipes: Recipe[] = response.data
            return recipes
        }
        console.warn("Call Recipes aborted!")

    } catch (error) {
        console.warn(error)
    }
    return [] as Recipe[]
}

export const plan = async (): Promise<Meal[]> => {
    try {
        const response = await instance.get(
            '/plan'
        )

        if (response.status = 200) {
            // Extract data and parse results into Meal Array
            let plan: BackendPlan = response.data
            const meals: Meal[] = []

            plan.meals.forEach((meal: any, idx: number) => {
                meals.push(
                    {
                        id: idx,
                        recipe: meal.recipe,
                        portions: meal.portion,
                        cooked: meal.cooked
                    } as Meal
                )
            })
            
            return meals
        }
        console.warn("Call Recipes aborted!")

    } catch (error) {
        console.warn(error)
    }
    return [] as Meal[]
}

export const planCook = async (recipeID: number): Promise<Meal[]> => {
    let recipeArg = JSON.stringify(recipeID)
    try {
        const response = await instance.put(
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

            plan.meals.forEach((meal: any, idx: number) => {
                meals.push(
                    {
                        id: idx,
                        recipe: meal.recipe,
                        portions: meal.portion,
                        cooked: meal.cooked
                    } as Meal
                )
            })

            return meals
        }
        console.warn("Call planCook aborted!")

    } catch (error) {
        console.warn(error)
    }
    return [] as Meal[]
}