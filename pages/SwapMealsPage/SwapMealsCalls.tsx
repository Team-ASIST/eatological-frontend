import { Recipe, BackendPlan } from "../../utils/dataTypes"
export class RecipeSwipeObject {
    id: number;
    recipe: Recipe;
    portions: number;

    constructor(id: number, recipe: Recipe, portions: number) {
        this.id = id;
        this.recipe = recipe;
        this.portions = portions
    }

    keyExtractor = (): number => {
        return this.id;
    }

    swapRecipe = (newRecipe: Recipe): void => {
        this.recipe = newRecipe;
    }
}

export type FrontendPlan = {
    recipeSwipeObjects: RecipeSwipeObject[],
    sustainabilityScore: number
}

export const getListWithNewRecipe = async (currentList: RecipeSwipeObject[], mealID: number): Promise<FrontendPlan> => {
    //TODO Catch Void Return 

    const result = currentList.map((x) => x);
    const newPlan = await fetch('https://eatological-dev.azurewebsites.net/plan/swiperight',
        {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Slot': mealID.toString(),
                'EatologicalToken': 'dev@eatological.de'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            return data as BackendPlan
        })
        .catch((error) => console.error(error))
    //TODO Catch unresolved Fetch

    result[mealID].swapRecipe((newPlan as BackendPlan).recipes[mealID].recipe)
    return { recipeSwipeObjects: result, sustainabilityScore: (newPlan as BackendPlan).sustainabilityScore }
}

export const getListWithOldRecipe = async (currentList: RecipeSwipeObject[], mealID: number): Promise<FrontendPlan> => {
    //TODO Catch Void Return

    const result = currentList.map((x) => x);
    const newPlan = await fetch('https://eatological-dev.azurewebsites.net/plan/swipeleft',
        {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Slot': mealID.toString(),
                'EatologicalToken': 'dev@eatological.de'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            return data as BackendPlan
        })
        .catch((error) => console.error(error))

    result[mealID].swapRecipe((newPlan as BackendPlan).recipes[mealID].recipe)
    return { recipeSwipeObjects: result, sustainabilityScore: (newPlan as BackendPlan).sustainabilityScore }
}

export const getInitialPlan = async (portions: number[], leftovers: string[], preferences: string[]): Promise<FrontendPlan> => {
    let portionsArg: string = JSON.stringify(portions)
    let leftoverArg: string = JSON.stringify(leftovers)
    let preferencesArg: string = JSON.stringify(preferences)
    const plan = await fetch('https://eatological-dev.azurewebsites.net/plan/create',
        {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Portions': portionsArg,
                'Leftovers': leftoverArg,
                'Preferences': preferencesArg,
                'EatologicalToken': 'dev@eatological.de'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            const recipeSwipeObjects: RecipeSwipeObject[] = []

            let i: number = 0
            while (i < data.recipes.length) {
                recipeSwipeObjects.push(
                    new RecipeSwipeObject(
                        i,
                        data.recipes[i].recipe,
                        portions[i]
                    )
                )
                i += 1
            }


            return { recipeSwipeObjects: recipeSwipeObjects, sustainabilityScore: (data as BackendPlan).sustainabilityScore }
        })
        .catch((error) => console.error(error));

    return plan as FrontendPlan
};