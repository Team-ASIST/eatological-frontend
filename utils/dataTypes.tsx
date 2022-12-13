// WebServer/java/scr/main/in - out
export type Ingredient = {
    name: string;
    smallestAmount: number;
    amount: number;
    unit: string;
    season: boolean;
    local: boolean;
    alternative: string;
}

export type Meal = {
    id: number;
    amount: number;
}

export type Recipe = {
    name: string;
    ingredients: Ingredient[];
    steps: string[];
    imageSource: string;
}

export type Plan = {
    recipe: Recipe[];
    sustainabilityScore: number; 
}