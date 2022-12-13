import { Meal, Recipe } from "../../utils/dataTypes"

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
    new RecipeSwipeElement(0, { name: "Paella", ingredients: [], steps: [], imageSource: images[0] }, 2),
    new RecipeSwipeElement(1, { name: "Lasagne", ingredients: [], steps: [], imageSource: images[1] }, 4),
    new RecipeSwipeElement(2, { name: "Pad Thai", ingredients: [], steps: [], imageSource: images[2] }, 3),
    new RecipeSwipeElement(3, { name: "Ramen", ingredients: [], steps: [], imageSource: images[3] }, 1),
]


export const getListWithNewRecipe = async (currentList: RecipeSwipeElement[]): Promise<RecipeSwipeElement[]> => {
    //TODO Call Backend for SwipeRight
    return currentList;
}

export const getListWithOldRecipe = async (currentList: RecipeSwipeElement[]): Promise<RecipeSwipeElement[]> => {
    //TODO Call Backend for SwipeLeft

    fetch('https://eatological-dev.azurewebsites.net/recipes', { method: 'GET', headers: { 'accept': 'application/json', 'EatologicalToken': 'dev@eatological.de' } })
        .then((response) => response.text())
        .then((data) => console.log("Success"))
        .catch((error) => console.log(error));

    return currentList;
}

export const getInitialPlan = async (data: Meal[]): Promise<RecipeSwipeElement[]> => {
    const recipes : Recipe[] = [] 


    fetch('https://eatological-dev.azurewebsites.net/recipes', { method: 'GET', headers: { 'accept': 'application/json', 'EatologicalToken': 'dev@eatological.de' } })
        .then((response) => response.json())
        .then((data) => {
            recipes.push(data)
        })
        .catch((error) => console.log(error));

    console.log(recipes.length)
    return recipeSwipeElements;
};