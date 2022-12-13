import { createSlice, nanoid } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface IMealAmount {
    id: string,
    amount: number
}

interface IState {
    mealAmount: IMealAmount[],
    leftovers: string[]
}

const initialState: IState = {
    mealAmount: [{
        id: nanoid(), 
        amount: 1
    }],
    leftovers: [],
}

const newPlanSlice = createSlice({
    name: 'newPlan',
    initialState,
    reducers: {
        mealAdded(state) {
            state.mealAmount.push(
                {
                    id: nanoid(),
                    amount: 1
                }
            )
        },
        mealIncrement(state, action) {
            const { id } = action.payload
            const existingMeal = state.mealAmount.find(meal => meal.id === id)
            if (existingMeal) {
                existingMeal.amount++
            }
        },
        mealDecrement(state, action) {
            const { id } = action.payload
            const existingMeal = state.mealAmount.find(meal => meal.id === id)
            if (existingMeal) {
                if (existingMeal.amount > 1) {
                    existingMeal.amount--
                } else if (state.mealAmount.length > 1) {
                    state.mealAmount = state.mealAmount.filter(meal => meal.id !== id)
                } 
            }
        },
    }
})

export const { mealAdded, mealIncrement, mealDecrement } = newPlanSlice.actions

export const selectAllMeals = (state: RootState) => state.newPlan.mealAmount

export default newPlanSlice.reducer