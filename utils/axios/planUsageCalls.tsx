import { backend } from "./config";
import { Ingredient } from "../dataTypes";

export const ingredients = async () : Promise<Ingredient[]> => {
    try {
        const response = await backend.get(
            '/ingredients'
        )

        if (response.status = 200) {
            // Extract data and parse results into Ingredient Array
            let ingredients: Ingredient[] = response.data
            return ingredients
        }
        console.error("Call Ingredients aborted!")

    } catch (error) {
        console.error(error)
    }
    return [] as Ingredient[]
}