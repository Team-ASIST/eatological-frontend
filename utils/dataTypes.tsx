export type Ingredient = {
    name: string;
    smallestAmount: number;
    amount: number;
    unit: string;
    season: boolean;
    local: boolean;
    alternative: string;
}

export type Recipe = {
    name: string;
    ingredients: Ingredient[];
    steps: string[];
    imageUrl: string;
}

export type Meal = {
    id: number, 
    recipe: Recipe,
    portions: number
}

export type Plan = {
    recipe: Recipe[];
    sustainabilityScore: number; 
}

