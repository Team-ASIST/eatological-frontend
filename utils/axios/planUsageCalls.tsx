import { instance } from ".";
import { Recipe, BackendPlan, Meal } from "../dataTypes";

export const recipes = async (): Promise<Recipe[]> => {
    try {
        const response = await instance.get(
            '/recipes'
        )

        // Extract data and parse results into Ingredient Array
        let recipes: Recipe[] = response.data
        return recipes

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

    } catch (error) {
        console.warn(error)
    }
    return [] as Meal[]
}