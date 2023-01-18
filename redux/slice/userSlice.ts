import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../utils/axios'
import { AppDispatch, RootState } from '../store'
import axios, { AxiosRequestConfig } from 'axios'
import { resetPlanConfiguration } from './newPlanSlice'
import { resetCurrentPlan, resetGroceries } from './currentPlanSlice'
import setUpInterceptor from '../../utils/axios/interceptor'

interface IUserState {
    name: string,
    token: string,
    restriction: string,
    updating: boolean,
}

const initialState: IUserState = {
    name: "",
    token: "",
    restriction: "",
    updating: false,
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        resetUser(state) {
            state.name = ""
            state.token = ""
        },
        changeUsername(state, action) {
            state.name = action.payload
        },
        changeRestriction(state, action) {
            state.restriction = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addUser.pending, (state) => {
                state.updating = true
            })
            .addCase(addUser.rejected, (state) => {
                state.updating = false
            })
            .addCase(addUser.fulfilled, (state, action) => {
                const username = action.payload as string
                state.name = username
                state.updating = false
            })
            .addCase(getToken.pending, (state) => {
                state.updating = true
            })
            .addCase(getToken.rejected, (state) => {
                state.updating = false
            })
            .addCase(getToken.fulfilled, (state, action) => {
                const token = action.payload as string
                setUpInterceptor(token)
                state.token = token
                state.updating = false
            })
            .addCase(renameUser.pending, (state) => {
                state.updating = true
            })
            .addCase(renameUser.rejected, (state) => {
                state.updating = false
            })
            .addCase(renameUser.fulfilled, (state, action) => {
                const newName = action.payload as string
                state.name = newName
                state.updating = false
            })
            .addCase(deleteUser.pending, (state) => {
                state.updating = true
            })
            .addCase(deleteUser.rejected, (state) => {
                state.updating = false
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const success = action.payload as boolean
                if (success) {
                    state.name = ""
                    state.token = ""
                }
                state.updating = false
            })
    }
})

/**
 * Fetches the token for the selected Username
 * @param name Username used to fetch the token
 * @returns Token String
 */
export const getToken = createAsyncThunk<
    string,
    string,
    {
        dispatch: AppDispatch,
        state: RootState
    }
>(
    'token',
    async (name, thunkApi) => {
        try {
            // Add new random user to the database
            const response = await instance.get(
                '/token',
                {
                    headers: {
                        'Username': name
                    }
                }
            )

            const message = response.data
            // If a new Username was used to fetch the token, change the Username and reset the currentPlanSlice
            if (thunkApi.getState().user.name !== name) {
                thunkApi.dispatch(changeUsername(name))
                thunkApi.dispatch(resetCurrentPlan())
            }
            return message.token
        } catch (error) {
            // Call erroneous

            // If the User is no longer active in the Backend, return empty token
            if ((error as any).response.status === 403 && 'errorCode' in (error as any).response.data) {
                if(thunkApi.getState().user.token === ""){
                    await thunkApi.dispatch(addUser())
                }{
                    return thunkApi.getState().user.token
                }
                
            }

            console.warn("[getToken]", error)
            throw error
        }
    }
)

/**
 * Add a new Guest User to the System
 * @returns string representing the newly added Guest User ("Gast" + randomNumber)
 */
export const addUser = createAsyncThunk<
    string,
    void,
    {
        dispatch: AppDispatch,
        state: RootState
    }
>(
    'user/add',
    async (_, thunkApi) => {
        try {
            // Add new user to the database
            const response = await instance.post(
                '/user/add',
                {}
            )

            const message = response.data

            await thunkApi.dispatch(getToken(message.username))

            return message.username
        } catch (error) {
            // Call erroneous
            console.warn("[addUser]", error)
            throw error
        }
    }
)

/**
 * Renames the user to the selected name if the name is not already linked to a different account
 * @param name new Username which the user wants to be renamed to
 * @returns name the newly set name
 */
export const renameUser = createAsyncThunk<
    string,
    string,
    {
        dispatch: AppDispatch,
        state: RootState
    }
>(
    'user/rename',
    async (name, thunkApi) => {
        try {
            // Rename active user
            const response = await instance.put(
                '/user/rename',
                {},
                {
                    headers: {
                        'username': name
                    }
                }
            )

            const message = response.data
            thunkApi.dispatch(getToken(name))
            return name
        } catch (error) {
            // Call erroneous
            console.warn("[renameUser]", error)
            throw error
        }
    }
)

/**
 * Deletes the active User and immediately generates a new Guest User
 * @returns boolean representing whether the active user could be deleted
 */
export const deleteUser = createAsyncThunk<
    boolean,
    void,
    {
        dispatch: AppDispatch,
        state: RootState
    }
>(
    'user/delete',
    async (_, thunkApi) => {
        try {
            // Delete User
            const response = await instance.delete(
                '/user/delete'
            )

            const message = response.data
            thunkApi.dispatch(resetCurrentPlan())
            thunkApi.dispatch(addUser())
            return true
        } catch (error) {
            // Call erroneous

            if ((error as any).response.status === 401) {
                thunkApi.dispatch(resetCurrentPlan())
                thunkApi.dispatch(addUser())
                return false
            }

            console.warn("[deleteUser]", error)
            throw error
        }
    }
)


export const selectUpdatingUser = (state: RootState) => state.user.updating
export const selectUsername = (state: RootState) => state.user.name
export const selectToken = (state: RootState) => state.user.token
export const selectRestriction = (state: RootState) => state.user.restriction

export const { resetUser } = userSlice.actions
export const { changeUsername } = userSlice.actions
export const { changeRestriction } = userSlice.actions

export default userSlice.reducer
