import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { backend } from '../../utils/axios/config'
import { AppDispatch, RootState } from '../store'
import axios, { AxiosRequestConfig } from 'axios'
import { resetPlanConfiguration } from './newPlanSlice'
import { resetCurrentPlan, resetGroceries } from './currentPlanSlice'

interface IUserState {
    name: string,
    token: string,
    updating: boolean,
}

const initialState: IUserState = {
    name: "",
    token: "",
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
            })
            .addCase(getToken.pending, (state) => {
                state.updating = true
            })
            .addCase(getToken.rejected, (state) => {
                state.updating = false
            })
            .addCase(getToken.fulfilled, (state, action) => {
                const token = action.payload as string
                state.token = token
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
            })
    }
})

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
            const response = await backend().get(
                '/token',
                {
                    headers: {
                        'Username': name
                    }
                }
            )

            if (response.status = 200) {
                const message = response.data

                if (!('errorCode' in message)) {
                    if(thunkApi.getState().user.name != name){
                        thunkApi.dispatch(changeUsername(name))
                        thunkApi.dispatch(resetCurrentPlan())
                    }
                    return message.token
                } else {
                    return thunkApi.getState().user.token
                }

            } else {
                console.error("Call Groceries aborted!")
                throw Error("Response was not 200")
            }
        } catch (error) {
            // Call erroneous
            console.error(error)
            throw error
        }
    }
)

export const addUser = createAsyncThunk<
    string,
    string,
    {
        dispatch: AppDispatch,
        state: RootState
    }
>(
    'user/add',
    async (name, thunkApi) => {
        try {
            // Add new user to the database
            const response = await backend().post(
                '/user/add',
                {}
            )

            if (response.status = 200) {
                const message = response.data

                if (!('errorCode' in message)) {
                    thunkApi.dispatch(getToken(message.username))
                    return message.username
                } else {
                    return ""
                }

            } else {
                console.error("Call Groceries aborted!")
                throw Error("Response was not 200")
            }
        } catch (error) {
            // Call erroneous
            console.error(error)
            throw error
        }
    }
)

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
            const response = await backend().put(
                '/user/rename',
                {},
                {
                    headers: {
                        'username': name
                    }
                }
            )

            if (response.status = 200) {
                const message = response.data

                if (!('errorCode' in message)) {
                    thunkApi.dispatch(getToken(name))
                    return name
                } else {
                    // Return old name
                    return thunkApi.getState().user.name
                }

            } else {
                console.error("Call Groceries aborted!")
                throw Error("Response was not 200")
            }
        } catch (error) {
            // Call erroneous
            console.error(error)
            throw error
        }
    }
)

export const deleteUser = createAsyncThunk<
    boolean,
    string,
    {
        dispatch: AppDispatch,
        state: RootState
    }
>(
    'user/delete',
    async (name, thunkApi) => {
        try {
            // Delete User
            const response = await backend().delete(
                '/user/delete'
            )

            if (response.status = 200) {
                const message = response.data

                if (!('errorCode' in message)) {
                    thunkApi.dispatch(resetCurrentPlan())
                    thunkApi.dispatch(addUser(""))
                    return true
                } else {
                    return false
                }

            } else {
                console.error("Call Groceries aborted!")
                throw Error("Response was not 200")
            }
        } catch (error) {
            // Call erroneous
            console.error(error)
            throw error
        }
    }
)


export const selectUpdatingUser = (state: RootState) => state.user.updating
export const selectUsername = (state: RootState) => state.user.name
export const selectToken = (state: RootState) => state.user.token

export const { resetUser } = userSlice.actions
export const { changeUsername } = userSlice.actions

export default userSlice.reducer
