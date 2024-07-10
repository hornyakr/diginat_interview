import { createAppSlice } from "@/lib/createAppSlice"
import type { AppThunk } from "@/lib/store"
import type { PayloadAction } from "@reduxjs/toolkit"
import { postBlog } from "./blogApi"
import { toast } from "sonner"

type status = "idle" | "loading" | "failed"

export interface BlogState {
  title: string
  body: string
  status: status
}

const initialState: BlogState = {
  body: "",
  title: "",
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
    submitBody: create.reducer((state, action: PayloadAction<string>) => {
      state.body = action.payload
    }),
    posting: create.asyncThunk(
      async ({ title, body }: { title: string; body: string }) => {
        const response = await postBlog({
          title,
          body,
        })
        // The value we return becomes the `fulfilled` action payload
        return response
      },
      {
        pending: (state) => {
          state.status = "loading"
        },
        fulfilled: (state) => {
          state.status = "idle"

          toast("Sikeres feltöltés")
        },
        rejected: (state) => {
          state.status = "failed"

          toast("Sikertelen feltöltés")
        },
      }
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectTitle: (blog) => blog.title,
    selectBody: (blog) => blog.body,
    selectStatus: (blog) => blog.status,
  },
})

// Action creators are generated for each case reducer function.
export const { submitTitle, submitBody, posting } = blogSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectTitle, selectBody, selectStatus } = blogSlice.selectors
