import { createSlice, current, nanoid } from '@reduxjs/toolkit'
import { Meal, largeGrocery } from '../../utils/dataTypes'
import { RootState } from '../store'


interface IState {
    recipes: Meal[],
    groceries: largeGrocery[]
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
            const largeGrocery = state.groceries.find(grocery => grocery.ingredientId === id)
            if (largeGrocery) {
                largeGrocery.grocery.bought = largeGrocery.grocery.required
            }
        }
    }
})

export const { updateRecipes, updateGroceries, buyGroc } = currentPlanSlice.actions

export const selectAllRecipes = (state: RootState) => state.currentPlan.recipes
export const selectNewPlanConfiguration = (state: RootState) => state.newPlan
export const selectSortedGroceries = (state: RootState) => {
    return state.currentPlan.groceries.slice().sort(function (grocery1, grocery2) {
        if (grocery1.grocery.bought === grocery1.grocery.required && grocery2.grocery.bought !== grocery2.grocery.required) {
            return 1
        }
        if (grocery1.grocery.bought !== grocery1.grocery.required && grocery2.grocery.bought === grocery2.grocery.required) {
            return -1
        }

        // Alphabetisch sortieren
        if (grocery1.ingredient.name < grocery2.ingredient.name) {
            return -1
        } else {
            return 1
        }
    }) as largeGrocery[]
}

export default currentPlanSlice.reducer