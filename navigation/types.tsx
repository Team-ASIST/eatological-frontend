import { Recipe } from "../utils/dataTypes";

export type RootStackParamList = {
    MealQuantity: undefined;
    LeftOvers: undefined;
    FoodPreferences: undefined;
    SwapMeals: undefined;
};

export type SettingsStackParamList = {
    User: undefined;
    Restrictions: undefined;
}

export type RootTabParamList = {
    NewPlan: undefined;
    CurrentPlan: undefined;
    GroceryList: undefined;
    Recipe: {recipe: Recipe};
    Settings: undefined;
};