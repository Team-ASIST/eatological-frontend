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
    quantity: number
    unit: string
}

export interface IFoodPreference {
    id: number
    name: string
}

interface IState {
    mealAmount: IMealAmount[]
    leftovers: ILeftOver[]
    preferences: IFoodPreference[]
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
                    quantity: 1,
                    unit: unit,
                })
            }
        },
        leftoverRemoved(state, action) {
            const { id } = action.payload
            const existingLeftover = state.leftovers.find((leftover) => leftover.id === id)
            if (existingLeftover) {
                state.leftovers = state.leftovers.filter((leftover) => leftover.id !== id)
            }
        },
        leftoverIncrement(state, action) {
            const { id } = action.payload
            const existingLeftover = state.leftovers.find((leftover) => leftover.id === id)
            if (existingLeftover) {
                existingLeftover.quantity++
            }
        },
        leftoverDecrement(state, action) {
            const { id } = action.payload
            const existingLeftover = state.leftovers.find((leftover) => leftover.id === id)
            if (existingLeftover) {
                if (existingLeftover.quantity > 1) {
                    existingLeftover.quantity--
                } else {
                    state.leftovers = state.leftovers.filter((leftover) => leftover.id !== id)
                }
            }
        },
        preferenceAdded(state, action) {
            const { id, name} = action.payload
            const existingPreference = state.preferences.find((preference) => preference.id === id)
            if (!existingPreference) {
                state.preferences.push({
                    id: id,
                    name: name,
                })
            }
        },
        preferenceRemoved(state, action) {
            const { id } = action.payload
            const existingPreference = state.preferences.find((preference) => preference.id === id)
            if (existingPreference) {
                state.preferences = state.preferences.filter((preference) => preference.id !== id)
            }
        },
        resetPlanConfiguration: () => initialState,
    }
})


export const {
    mealAdded,
    mealIncrement,
    mealDecrement,
    resetPlanConfiguration,
    leftoverAdded,
    leftoverIncrement,
    leftoverDecrement,
    leftoverRemoved,
    preferenceAdded,
    preferenceRemoved
} = newPlanSlice.actions

export const selectAllMeals = (state: RootState) => state.newPlan.mealAmount
export const selectNewPlanConfiguration = (state: RootState) => state.newPlan
export const selectAllLeftovers = (state: RootState) => state.newPlan.leftovers
export const selectAllPreferences = (state: RootState) => state.newPlan.preferences

export default newPlanSlice.reducer
