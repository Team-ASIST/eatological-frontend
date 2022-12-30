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
        }
    }
})

export const { updateRecipes, updateGroceries } = currentPlanSlice.actions

export const selectAllRecipes = (state: RootState) => state.currentPlan.recipes
export const selectAllGroceries = (state: RootState) => state.currentPlan.groceries
export const selectNewPlanConfiguration = (state: RootState) => state.newPlan

export default currentPlanSlice.reducer