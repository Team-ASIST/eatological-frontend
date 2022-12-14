import { createSlice, current, nanoid } from '@reduxjs/toolkit'
import { RecipeSwipeObject } from '../../pages/SwapMealsPage/SwapMealsCalls'
import { Meal, Recipe } from '../../utils/dataTypes'
import { RootState } from '../store'


interface IState {
    recipes: Meal[]
}

const initialState: IState = {
    recipes: []
}

const currentPlanSlice = createSlice({
    name: 'currentPlan',
    initialState,
    reducers: {
        updateRecipes(state, action) {
            const { recipes } = action.payload
            state.recipes = recipes
        }
    }
})

export const { updateRecipes } = currentPlanSlice.actions

export const selectAllRecipes = (state: RootState) => state.currentPlan.recipes
export const selectNewPlanConfiguration = (state: RootState) => state.newPlan

export default currentPlanSlice.reducer