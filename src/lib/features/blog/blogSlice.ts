import { createAppSlice } from "@/lib/createAppSlice"
import type { AppThunk } from "@/lib/store"
import type { PayloadAction } from "@reduxjs/toolkit"
import { postBlog } from "./blogApi"

export interface BlogState {
  title: string
  body: string
  userId: number
  status: "idle" | "loading" | "failed"
}

const initialState: BlogState = {
  body: "",
  title: "",
  userId: 1,
  status: "idle",
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const blogSlice = createAppSlice({
  name: "blog",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    submitTitle: create.reducer((state, action: PayloadAction<string>) => {
      state.title = action.payload
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectTitle: (blog) => blog.title,
    selectBody: (blog) => blog.body,
  },
})

// Action creators are generated for each case reducer function.
export const { submitTitle } = blogSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectTitle, selectBody } = blogSlice.selectors
