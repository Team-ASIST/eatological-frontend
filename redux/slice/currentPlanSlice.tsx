import { createAsyncThunk, createSlice, current, nanoid } from '@reduxjs/toolkit'
import { backend } from '../../utils/axios/config'
import { Meal, LargeGrocery, Grocery, Ingredient } from '../../utils/dataTypes'
import { AppDispatch, RootState } from '../store'


interface IState {
    recipes: Meal[], // TODO: Now we have meal and recipe type, this is very confusing
    groceries: LargeGrocery[],
    ingredients: Ingredient[]
}

const initialState: IState = {
    recipes: [],
    groceries: [],
    ingredients: [],
}

const currentPlanSlice = createSlice({
    name: 'currentPlan',
    initialState,
    reducers: {
        resetGroceries(state) {
            state.groceries = [] as LargeGrocery[]
        },
    },
    extraReducers(builder) {
        builder
            .addCase(acceptPlan.fulfilled, (state, action) => {
                const meals = action.payload as Meal[]
                state.recipes = meals
            })
            .addCase(getGroceries.fulfilled, (state, action) => {
                const groceries = action.payload as Grocery[]
                let largeGroceries: LargeGrocery[] = state.groceries

                for (const grocery of groceries) {
                    let largeGrocery = state.groceries.find(largeGrocery => largeGrocery.ingredientId === grocery.ingredientId)
                    if (largeGrocery) {
                        if (largeGrocery.grocery.bought < grocery.bought) {
                            Object.assign(largeGrocery, {
                                ...largeGrocery,
                                grocery: {
                                    ...largeGrocery.grocery,
                                    bought: largeGrocery.grocery.required
                                }
                            });
                        }
                    } else {
                        for (const ing of state.ingredients) {
                            if (grocery.ingredientId === ing.id) {
                                largeGroceries.push({
                                    ingredientId: grocery.ingredientId,
                                    grocery: grocery,
                                    ingredient: ing
                                })
                            }
                        }
                    }
                }

                state.groceries = largeGroceries
            })
            .addCase(getIngredients.fulfilled, (state, action) => {
                const ingredients = action.payload as Ingredient[]

                state.ingredients = ingredients
            })
            .addCase(updateGroceries.fulfilled, (state, action) => {
                const groceries = action.payload as Grocery[]

                for (const grocery of groceries) {
                    let largeGrocery = state.groceries.find(largeGrocery => largeGrocery.ingredientId === grocery.ingredientId)
                    if (largeGrocery) {
                        // Local missing information from backend
                        if (largeGrocery.grocery.bought < grocery.bought) {
                            Object.assign(largeGrocery, {
                                ...largeGrocery,
                                grocery: {
                                    ...largeGrocery.grocery,
                                    bought: largeGrocery.grocery.required
                                }
                            });
                        }
                    }
                }
            }
            )
    }
})

export const { resetGroceries } = currentPlanSlice.actions

export const updateGroceries = createAsyncThunk<
    Grocery[],
    Grocery[],
    {
        dispatch: AppDispatch,
        state: RootState
    }
>(
    'currentPlan/updateGroceries',
    async (groceries, thunkApi) => {
        let oldGroceries = thunkApi.getState().currentPlan.groceries

        let updatedGroceries: Grocery[] = oldGroceries.map(obj => groceries.find(o => o.ingredientId === obj.ingredientId) || obj.grocery);

        let groceriesArg = JSON.stringify(updatedGroceries)
        try {
            // Get Groceries for the User
            const response = await backend.put(
                '/groceries/buy',
                {},
                {
                    headers: {
                        'Groceries': groceriesArg
                    }
                }
            )

            if (response.status = 200) {
                // Return data

                return response.data.groceries as Grocery[]
            }
            console.error("Call BuyGrocery aborted!")
        } catch (error) {
            // Call erroneous
            console.error(error)
        }
        // Send Empty GroceryList
        return [] as Grocery[]
    }
)

export const acceptPlan = createAsyncThunk<
    Meal[],
    Meal[]
>(
    'currentPlan/acceptPlan',
    async (meals, thunkApi) => {
        try {
            const response = await backend.post(
                '/plan/accept',
                {},
                { headers: {} }
            )
            thunkApi.dispatch(resetGroceries())
            thunkApi.dispatch(getGroceries())
            return meals
        } catch (error) {
            // Call erroneous
            console.error(error)
        }

        return [] as Meal[]
    }
)

export const getIngredients = createAsyncThunk<
    Ingredient[]
>(
    'currentPlan/getIngredients',
    async () => {
        try {
            const response = await backend.get(
                '/ingredients'
            )

            if (response.status = 200) {
                // Extract data and parse results into Ingredient Array
                let ingredients: Ingredient[] = response.data
                return ingredients
            }
            console.error("Call Ingredients aborted!")

        } catch (error) {
            console.error(error)
        }
        return [] as Ingredient[]
    }
)

export const getGroceries = createAsyncThunk<
    Grocery[]
>(
    'currentPlan/getGroceries',
    async () => {
        try {
            // Get Groceries for the User
            const response = await backend.get(
                '/groceries'
            )

            if (response.status = 200) {
                // Return data
                console.log(response.data.groceries)
                return response.data.groceries as Grocery[]
            }
            console.error("Call Groceries aborted!")
        } catch (error) {
            // Call erroneous
            console.error(error)
        }
        // Send Empty GroceryList
        return [] as Grocery[]
    }
)

export const selectAllRecipes = (state: RootState) => state.currentPlan.recipes
export const selectAllIngredients = (state: RootState) => state.currentPlan.ingredients
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
    }) as LargeGrocery[]
}

export default currentPlanSlice.reducer