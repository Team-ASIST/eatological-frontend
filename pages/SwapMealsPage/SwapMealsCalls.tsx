import { Recipe } from "../../utils/dataTypes"

// Mockdata

const images: string[] = [
    'https://images.unsplash.com/photo-1588276552401-30058a0fe57b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2023&q=80',
    'https://images.unsplash.com/photo-1619895092538-128341789043?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1626804475315-9644b37a2fe4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1618889482923-38250401a84e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
]

export class RecipeSwipeElement {
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

export const recipeSwipeElements: RecipeSwipeElement[] = [
    new RecipeSwipeElement(0, { name: "Paella", ingredients: [], steps: [], imageUrl: images[0] }, 2),
    new RecipeSwipeElement(1, { name: "Lasagne", ingredients: [], steps: [], imageUrl: images[1] }, 4),
    new RecipeSwipeElement(2, { name: "Pad Thai", ingredients: [], steps: [], imageUrl: images[2] }, 3),
    new RecipeSwipeElement(3, { name: "Ramen", ingredients: [], steps: [], imageUrl: images[3] }, 1),
]


export const getListWithNewRecipe = async (currentList: RecipeSwipeElement[], mealID: number): Promise<RecipeSwipeElement[]> => {
    //TODO Catch Void Return 

    /*
    const result = currentList;
    const newRecipe = await fetch('https://eatological-dev.azurewebsites.net/plan/swipeRight',
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
            return data.recipes[0] as Recipe
        })
        .catch((error) => console.log(error));
    

    result[mealID].swapRecipe(newRecipe as Recipe);    
    console.log("SwipeRight Finished!")*/
    //return result;
    return currentList;
}

export const getListWithOldRecipe = async (currentList: RecipeSwipeElement[], mealID: number): Promise<RecipeSwipeElement[]> => {
    //TODO Catch Void Return 

    /*
    const result = currentList;
    const newRecipe = await fetch('https://eatological-dev.azurewebsites.net/plan/swipeLeft',
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
            return data.recipes[0] as Recipe
        })
        .catch((error) => console.log(error));
    

    result[mealID].swapRecipe(newRecipe as Recipe);    
    console.log("SwipeRight Finished!")*/
    //return result;
    return currentList;
}

export const getInitialPlan = async (portions: number[], leftovers: string[], preferences: string[]): Promise<RecipeSwipeElement[]> => {
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
            const recipeSwipeElements: RecipeSwipeElement[] = []

            let i: number = 0;
            while (i < data.recipes.length) {
                recipeSwipeElements.push(
                    new RecipeSwipeElement(
                        i,
                        data.recipes[i].recipe,
                        portions[i]
                    )
                )
                i += 1;
            }


            return recipeSwipeElements as RecipeSwipeElement[];
        })
        .catch((error) => console.log(error));



    console.log("Initial Fetching finished!")
    return result as RecipeSwipeElement[];
};

export const getRecipes = async (): Promise<RecipeSwipeElement[]> => {
    const result = await fetch('https://eatological-dev.azurewebsites.net/recipes', { method: 'GET', headers: { 'accept': 'application/json', 'EatologicalToken': 'dev@eatological.de' } })
        .then((response) => response.json())
        .then((data) => {
            const recipeSwipeElements: RecipeSwipeElement[] = []

            let i: number = 0;
            while (i < data.length) {
                recipeSwipeElements.push(
                    new RecipeSwipeElement(
                        i,
                        data[i],
                        4
                    )
                )
                i += 1;
            }


            return recipeSwipeElements as RecipeSwipeElement[];
        })
        .catch((error) => console.log(error));

    return result as RecipeSwipeElement[];
    //return recipeSwipeElements;
};