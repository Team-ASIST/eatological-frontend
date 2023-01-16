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

            if (response.status = 200) {
                const message = response.data

                if (!('errorCode' in message)) {
                    if (thunkApi.getState().user.name != name) {
                        thunkApi.dispatch(changeUsername(name))
                        thunkApi.dispatch(resetCurrentPlan())
                    }
                    return message.token
                } else {
                    return ""
                }

            } else {
                console.warn("Call Groceries aborted!")
                throw Error("Response was not 200")
            }
        } catch (error) {
            // Call erroneous

            if ((error as any).response.status === 403 && 'errorCode' in (error as any).response.data) {
                return ""
            }

            console.warn(error)
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
    async (usage, thunkApi) => {
        try {
            // Add new user to the database
            const response = await instance.post(
                '/user/add',
                {}
            )

            if (response.status = 200) {
                const message = response.data

                if (!('errorCode' in message)) {
                    if (usage != "AppStart") {
                        thunkApi.dispatch(getToken(message.username))
                    }
                    return message.username
                } else {
                    return ""
                }

            } else {
                console.warn("Call Groceries aborted!")
                throw Error("Response was not 200")
            }
        } catch (error) {
            // Call erroneous
            console.warn(error)
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
            const response = await instance.put(
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
                console.warn("Call Groceries aborted!")
                throw Error("Response was not 200")
            }
        } catch (error) {
            // Call erroneous
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
            const response = await instance.delete(
                '/user/delete'
            )

            if (response.status = 200) {
                const message = response.data

                if (!('errorCode' in message)) {
                    thunkApi.dispatch(resetCurrentPlan())
                    thunkApi.dispatch(addUser("Delete"))
                    return true
                } else {
                    thunkApi.dispatch(resetCurrentPlan())
                    thunkApi.dispatch(addUser("Delete"))
                    return false
                }

            } else {
                console.warn("Call Groceries aborted!")
                throw Error("Response was not 200")
            }
        } catch (error) {
            // Call erroneous

            if ((error as any).response.status === 401) {
                thunkApi.dispatch(resetCurrentPlan())
                thunkApi.dispatch(addUser("Delete"))
                return false
            }

            console.warn(error)
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
