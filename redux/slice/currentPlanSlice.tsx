import { createSlice, current, nanoid } from '@reduxjs/toolkit'
import { RecipeSwipeObject } from '../../utils/dataTypes'
import { Meal, Recipe, Grocery } from '../../utils/dataTypes'
import { RootState } from '../store'


interface IState {
    recipes: Meal[],
    groceries: Grocery[]
}

const initialState: IState = {
    recipes: [],
    groceries: []
}

const currentPlanSlice = createSlice({
    name: 'currentPlan',
    initialState,
    reducers: {
        updateRecipes(state, action) {
            const { recipes } = action.payload
            state.recipes = recipes
        },
        updateGroceries(state, action) {
            const { groceries } = action.payload
            state.groceries = groceries
        },
        buyGroc(state, action) {
            const { id } = action.payload
            const grocery = state.groceries.find(grocery => grocery.ingredientId === id)
            if (grocery) {
                grocery.bought = grocery.required
            }
        }
    }
})

export const { updateRecipes, updateGroceries, buyGroc } = currentPlanSlice.actions

export const selectAllRecipes = (state: RootState) => state.currentPlan.recipes
export const selectAllGroceries = (state: RootState) => state.currentPlan.groceries
export const selectNewPlanConfiguration = (state: RootState) => state.newPlan

export default currentPlanSlice.reducer