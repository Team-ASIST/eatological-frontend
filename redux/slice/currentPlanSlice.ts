import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../utils/axios'
import { Meal, LargeGrocery, Grocery, Ingredient, BackendPlan, smallIngredient } from '../../utils/dataTypes'
import { AppDispatch, RootState } from '../store'


interface IState {
    recipes: Meal[],
    groceries: LargeGrocery[],
    ingredients: Ingredient[],
    updating: boolean
}

const initialState: IState = {
    recipes: [],
    groceries: [],
    ingredients: [],
    updating: false
}

const currentPlanSlice = createSlice({
    name: 'currentPlan',
    initialState,
    reducers: {
        resetCurrentPlan(state) {
            state.recipes = [] as Meal[]
            state.groceries = [] as LargeGrocery[]
        },
        resetGroceries(state) {
            state.groceries = [] as LargeGrocery[]
        }
    },
    extraReducers(builder) {
        builder
            .addCase(planCook.pending, (state, { meta }) => {
                const mealId = meta.arg

                let meal = state.recipes.find((meal: Meal) => meal.recipe.id === mealId)

                if (meal) {
                    meal.cooked = !meal.cooked
                }
            })
            .addCase(acceptPlan.fulfilled, (state, { meta }) => {
                const meals = meta.arg as Meal[]
                state.recipes = meals
            })
            .addCase(getGroceries.pending, (state) => {
                state.updating = true
            })
            .addCase(getGroceries.rejected, (state) => {
                state.updating = false
            })
            .addCase(getGroceries.fulfilled, (state, action) => {
                const groceries = action.payload as Grocery[]
                let largeGroceries: LargeGrocery[] = []

                for (const grocery of groceries) {
                    let largeGrocery = state.groceries.find(largeGrocery => largeGrocery.ingredientId === grocery.ingredientId)
                    if (largeGrocery) {
                        if (largeGrocery.grocery.bought < grocery.bought) {
                            largeGroceries.push(Object.assign(largeGrocery, {
                                ...largeGrocery,
                                grocery: {
                                    ...largeGrocery.grocery,
                                    bought: largeGrocery.grocery.required
                                }
                            }))
                        } else {
                            largeGroceries.push({
                                ingredientId: grocery.ingredientId,
                                grocery: grocery,
                                ingredient: largeGrocery.ingredient
                            })
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
                state.updating = false
            })
            .addCase(getIngredients.fulfilled, (state, action) => {
                const ingredients = action.payload as Ingredient[]

                state.ingredients = ingredients
            })
            .addCase(getPlan.pending, (state) => {
                state.updating = true
            })
            .addCase(getPlan.rejected, (state) => {
                state.updating = false
            })
            .addCase(getPlan.fulfilled, (state, action) => {
                const meals = action.payload as Meal[]

                state.recipes = meals
                state.updating = false
            })
            .addCase(updateGroceries.pending, (state, { meta }) => {
                const groceries = meta.arg as Grocery[]

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
            })
            .addCase(updateGroceries.rejected, (state, action) => {
            })
    }
})

export const { resetCurrentPlan } = currentPlanSlice.actions
export const { resetGroceries } = currentPlanSlice.actions

/**
 * Updates the stored set of Groceries by sending the new set of groceries including the newly bought grocery to the backend
 * @param groceries set of all Groceries which sh
 * @returns the updated set of groceries provided by the backend after the request concludes 
 */
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

        // Replaces Grocery in stored set if it is present in the received groceries
        let updatedGroceries: Grocery[] = oldGroceries.map(obj => groceries.find(o => o.ingredientId === obj.ingredientId) || obj.grocery);

        let groceriesArg = JSON.stringify(updatedGroceries)
        try {
            // Get Groceries for the User
            const response = await instance.put(
                '/groceries/buy',
                {},
                {
                    headers: {
                        'Groceries': groceriesArg
                    }
                }
            )

            // Return data
            return response.data.groceries as Grocery[]
        } catch (error) {
            // Call erroneous
            console.warn("[updateGroceries]", error)
            throw error
        }
    }
)

/**
 * Confirm the current plan configuration in SwapMealsPage by requesting an accept in the backend
 * @param meals current plan active in the SwapMealsPage
 * @returns the accepted plan
 */
export const acceptPlan = createAsyncThunk<
    Meal[],
    Meal[]
>(
    'currentPlan/acceptPlan',
    async (meals, thunkApi) => {
        try {
            const response = await instance.post(
                '/plan/accept',
                {},
                { headers: {} }
            )
            thunkApi.dispatch(resetGroceries())
            await thunkApi.dispatch(getGroceries())
            return meals
        } catch (error) {
            // Call erroneous
            console.warn("[acceptPlan]", error)
            throw error
        }
    }
)

/**
 * Fetch the current Plan from the Backend
 * @returns the Current Plan 
 */
export const getPlan = createAsyncThunk<
    Meal[],
    void
>(
    'currentPlan/getPlan',
    async () => {
        try {
            const response = await instance.get(
                '/plan'
            )

            // Extract data and parse results into Meal Array
            let plan: BackendPlan = response.data
            const meals: Meal[] = []
            let i: number = 0

            plan.meals.forEach((meal: any, idx: number) => {
                meals.push(
                    {
                        id: idx,
                        recipe: meal.recipe,
                        portions: meal.portion,
                        cooked: meal.cooked
                    } as Meal
                )
            })

            return meals
        } catch (error) {
            console.warn("[getPlan]", error)
            throw error
        }
    }
)

/**
 * Fetch all Ingredients from the Backend
 * @returns all Ingredients
 */
export const getIngredients = createAsyncThunk<
    Ingredient[]
>(
    'currentPlan/getIngredients',
    async () => {
        try {
            const response = await instance.get(
                '/ingredients'
            )

            // Extract data and parse results into Ingredient Array
            let ingredients: Ingredient[] = response.data
            return ingredients
        } catch (error) {
            console.warn("[getIngredients]", error)
            throw error
        }
    }
)

/**
 * Sets the Recipe with MealId as cooked in the Backend --> Deregister Groceries
 */
export const planCook = createAsyncThunk<
    void,
    number
>(
    'currentPlan/planCook',
    async (mealId: number) => {
        try {
            const response = await instance.put(
                '/plan/cook',
                {},
                {
                    headers: {
                        'RecipeId': mealId
                    }
                }
            )
        } catch (error) {
            // Call erroneous
            console.warn("[planCook]", error)
            throw error
        }
    }
)

/**
 * Fetches the GroceryList from the Backend
 * @returns the GroceryList
 */
export const getGroceries = createAsyncThunk<
    Grocery[]
>(
    'currentPlan/getGroceries',
    async () => {
        try {
            // Get Groceries for the User
            const response = await instance.get(
                '/groceries'
            )

            // Return data
            return response.data.groceries as Grocery[]
        } catch (error) {
            // Call erroneous
            console.warn("[getGroceries]", error)
            throw error
        }
    }
)

export const selectUpdatingPlan = (state: RootState) => state.currentPlan.updating
export const selectAllRecipes = (state: RootState) => state.currentPlan.recipes
export const selectAllGroceries = (state: RootState) => state.currentPlan.groceries
export const selectAllIngredients = (state: RootState) => state.currentPlan.ingredients
export const selectNewPlanConfiguration = (state: RootState) => state.newPlan
export const selectSortedGroceries = (state: RootState) => {
    return state.currentPlan.groceries.slice().sort(function (grocery1, grocery2) {
        // Already bought Ingredients should be at the end of the list
        if (grocery1.grocery.bought >= grocery1.grocery.required && grocery2.grocery.bought < grocery2.grocery.required) {
            return 1
        }
        // Ingredients which are not yet bought should be at the beginning of the list
        if (grocery1.grocery.bought < grocery1.grocery.required && grocery2.grocery.bought >= grocery2.grocery.required) {
            return -1
        }

        // If both are the same regarding bought or not bought, sort alphabetically
        if (grocery1.ingredient.name < grocery2.ingredient.name) {
            return -1
        } else {
            return 1
        }
    }) as LargeGrocery[]
}

export default currentPlanSlice.reducer