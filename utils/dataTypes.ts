// Data Types for the Backend Data

export type Ingredient = {
    name: string,
    smallestAmount: number,
    amount: number,
    unit: string,
    season: boolean,
    local: boolean,
    alternative: string,
}

export type Recipe = {
    name: string,
    ingredients: Ingredient[],
    steps: string[],
    imageUrl: string,
    prepTime: number,
    totalTime: number,
}

export type RecipeState = {
    cooked: boolean,
    recipe: Recipe
}

export type BackendPlan = {
    recipes: RecipeState[],
    sustainabilityScore: number 
}

// Data Types for the Frontend Data

export type Meal = {
    id: number, 
    recipe: Recipe,
    portions: number
}