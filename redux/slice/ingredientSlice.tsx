import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface Ingredient {
    id: number
    smallestAmount: number
    amount: number
    name: string
    unit: string
    season: boolean
    local: boolean
    alternative: string
}

interface IState {
    ingredients: Ingredient[]
}

const initialState: IState = {
    ingredients: [],
}

const ingredientSlice = createSlice({
    name: 'currentIngredients',
    initialState,
    reducers: {
        ingredientAdded(state, action) {
            state.ingredients.push(
                action.payload
            )
        },
        resetPlanConfiguration: () => initialState,
    },
})

export const { ingredientAdded, resetPlanConfiguration } = ingredientSlice.actions

export const selectAllIngredients = (state: RootState) => state.currentIngredients.ingredients

export default ingredientSlice.reducer
