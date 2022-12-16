import { configureStore } from '@reduxjs/toolkit'

import newPlanReducer from './slice/newPlanSlice'
import currentPlanReducer from './slice/currentPlanSlice'

export const store = configureStore({
  reducer: {
    newPlan: newPlanReducer,
    currentPlan: currentPlanReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch