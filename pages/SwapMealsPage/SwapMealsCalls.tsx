import { Recipe } from "../../utils/dataTypes"

// Mockdata

const images: string[] = [
    'https://images.unsplash.com/photo-1588276552401-30058a0fe57b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2023&q=80',
    'https://images.unsplash.com/photo-1619895092538-128341789043?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1626804475315-9644b37a2fe4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1618889482923-38250401a84e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
]

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

export const recipeSwipeElements: RecipeSwipeObject[] = [
    new RecipeSwipeObject(0, { name: "Paella", ingredients: [], steps: [], imageUrl: images[0] }, 2),
    new RecipeSwipeObject(1, { name: "Lasagne", ingredients: [], steps: [], imageUrl: images[1] }, 4),
    new RecipeSwipeObject(2, { name: "Pad Thai", ingredients: [], steps: [], imageUrl: images[2] }, 3),
    new RecipeSwipeObject(3, { name: "Ramen", ingredients: [], steps: [], imageUrl: images[3] }, 1),
]


export const getListWithNewRecipe = async (currentList: RecipeSwipeObject[], mealID: number): Promise<RecipeSwipeObject[]> => {
    //TODO Catch Void Return 

    const result = currentList.map((x) => x);
    const newRecipes = await fetch('https://eatological-dev.azurewebsites.net/plan/swiperight',
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
            return data.recipes as any[]
        })
        .catch((error) => console.error(error))


    result[mealID].swapRecipe((newRecipes as any[])[mealID].recipe)
    return result
}

export const getListWithOldRecipe = async (currentList: RecipeSwipeObject[], mealID: number): Promise<RecipeSwipeObject[]> => {
    //TODO Catch Void Return

    const result = currentList.map((x) => x);
    const newRecipes = await fetch('https://eatological-dev.azurewebsites.net/plan/swipeleft',
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
            return data.recipes as any[]
        })
        .catch((error) => console.error(error))

    result[mealID].swapRecipe((newRecipes as any[])[mealID].recipe)
    return result
}

export const getInitialPlan = async (portions: number[], leftovers: string[], preferences: string[]): Promise<RecipeSwipeObject[]> => {
    let portionsArg: string = JSON.stringify(portions)
    let leftoverArg: string = JSON.stringify(leftovers)
    let preferencesArg: string = JSON.stringify(preferences)
    const result = await fetch('https://eatological-dev.azurewebsites.net/plan/create',
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
            const recipeSwipeElements: RecipeSwipeObject[] = []

            let i: number = 0
            while (i < data.recipes.length) {
                recipeSwipeElements.push(
                    new RecipeSwipeObject(
                        i,
                        data.recipes[i].recipe,
                        portions[i]
                    )
                )
                i += 1
            }


            return recipeSwipeElements as RecipeSwipeObject[];
        })
        .catch((error) => console.error(error));

    return result as RecipeSwipeObject[];
};

export const getRecipes = async (): Promise<RecipeSwipeObject[]> => {
    const result = await fetch('https://eatological-dev.azurewebsites.net/recipes', { method: 'GET', headers: { 'accept': 'application/json', 'EatologicalToken': 'dev@eatological.de' } })
        .then((response) => response.json())
        .then((data) => {
            const recipeSwipeElements: RecipeSwipeObject[] = []

            let i: number = 0;
            while (i < data.length) {
                recipeSwipeElements.push(
                    new RecipeSwipeObject(
                        i,
                        data[i],
                        4
                    )
                )
                i += 1;
            }


            return recipeSwipeElements as RecipeSwipeObject[];
        })
        .catch((error) => console.error(error));

    return result as RecipeSwipeObject[];
    //return recipeSwipeElements;
};