import { createSlice, nanoid } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface IMealAmount {
    id: string
    amount: number
}

export interface ILeftOver {
    id: number
    name: string
    smallestAmount: number
    unit: string
}

interface IState {
    mealAmount: IMealAmount[]
    leftovers: ILeftOver[]
    preferences: string[]
}

const initialState: IState = {
    mealAmount: [
        {
            id: nanoid(),
            amount: 1,
        },
    ],
    leftovers: [],
    preferences: [],
}

const newPlanSlice = createSlice({
    name: 'newPlan',
    initialState,
    reducers: {
        mealAdded(state) {
            state.mealAmount.push({
                id: nanoid(),
                amount: 1,
            })
        },
        mealIncrement(state, action) {
            const { id } = action.payload
            const existingMeal = state.mealAmount.find((meal) => meal.id === id)
            if (existingMeal) {
                existingMeal.amount++
            }
        },
        mealDecrement(state, action) {
            const { id } = action.payload
            const existingMeal = state.mealAmount.find((meal) => meal.id === id)
            if (existingMeal) {
                if (existingMeal.amount > 1) {
                    existingMeal.amount--
                } else if (state.mealAmount.length > 1) {
                    state.mealAmount = state.mealAmount.filter((meal) => meal.id !== id)
                }
            }
        },
        leftoverAdded(state, action) {
            const { id, name, smallestAmount, unit } = action.payload
            const existingLeftover = state.leftovers.find((leftover) => leftover.id === id)
            if (!existingLeftover) {
                state.leftovers.push({
                    id: id,
                    name: name,
                    smallestAmount: smallestAmount,
                    unit: unit,
                })
            }
        },
        leftoverIncrement(state, action) {
            const { id } = action.payload
            const existingLeftover = state.leftovers.find((leftover) => leftover.id === id)
            if (existingLeftover) {
                existingLeftover.smallestAmount++
            }
        },
        leftoverDecrement(state, action) {
            const { id } = action.payload
            const existingLeftover = state.leftovers.find((leftover) => leftover.id === id)
            if (existingLeftover) {
                if (existingLeftover.smallestAmount > 1) {
                    existingLeftover.smallestAmount--
                } else {
                    state.leftovers = state.leftovers.filter((leftover) => leftover.id !== id)
                }
            }
        },
        resetPlanConfiguration: () => initialState,
    },
})

export const {
    mealAdded,
    mealIncrement,
    mealDecrement,
    resetPlanConfiguration,
    leftoverAdded,
    leftoverIncrement,
    leftoverDecrement,
} = newPlanSlice.actions

export const selectAllMeals = (state: RootState) => state.newPlan.mealAmount
export const selectNewPlanConfiguration = (state: RootState) => state.newPlan
export const selectAllLeftovers = (state: RootState) => state.newPlan.leftovers

export default newPlanSlice.reducer
