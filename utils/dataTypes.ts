// Data Types for the Backend Data

export type Ingredient = {
    id: number,
    name: string,
    smallestAmount: number, 
    amount: number,
    unit: string,
    season: boolean,
    local: boolean,
    alternative: string,
}

export type smallIngredient = {
    id: number, 
    quantity: number 
}

export type Recipe = {
    id: number, 
    name: string,
    items: smallIngredient[],
    steps: string[],
    imageUrl: string,
    prepTime: number,
    totalTime: number,
}

export type RecipeState = {
    recipe: Recipe,
    portion: number,
    cooked: boolean
}

export type BackendPlan = {
    meals: RecipeState[],
    sustainabilityScore: number
}

export type Grocery = {
    ingredientId: number,
    required: number,
    bought: number
}

// Data Types for the Frontend Data

export type Meal = {
    id: number,
    recipe: Recipe,
    portions: number,
    cooked: boolean,
}

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

export type LargeGrocery = {
    ingredientId: number,
    grocery: Grocery,
    ingredient: Ingredient
}

export type Restriction = {
    name: string,
    active: boolean
}


export interface LeftOver {
    id: number
    name: string
    smallestAmount: number
    quantity: number
    unit: string
}

export interface FoodPreference {
    id: number
    name: string
}