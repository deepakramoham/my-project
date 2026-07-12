import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./userThunks";

const initialState = {
  loading: false,
  error: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state,) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, ) => {
        // state.user = action.payload;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(login.pending, (state, ) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
