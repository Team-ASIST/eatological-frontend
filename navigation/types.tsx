import { Recipe } from "../utils/dataTypes";

export type RootStackParamList = {
    MealQuantity: undefined;
    LeftOvers: undefined;
    SwapMeals: undefined;
};

export type RootTabParamList = {
    NewPlan: undefined;
    CurrentPlan: undefined;
    GroceryList: undefined;
    Recipe: {recipe: Recipe};
    Settings: undefined;
};