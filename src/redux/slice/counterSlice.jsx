import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCourses = createAsyncThunk(
  "counter/getAllCourses",
  async () => {
    const response = await fetch(
      "https://todo-app-backend-5bep.onrender.com/task",
    );
    const result = await response.json();
    return result;
  },
);

const initialState = {
  count: 0,
  dummy: "dummy",
  courses: [],
  loading: false,
};
//Immer.js
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    Increment: (state, action) => {
      console.log(action);
      state.count++;
    },
    Decrement: (state) => {
      state.count--;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state, action) => {
        console.log(action);
        state.loading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        console.log(action);
        console.log(action.payload);
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        console.log(action);
        console.log(action.error);
      });
  },
});

// console.log(counterSlice.reducer);
// console.log(counterSlice.actions);

export const { Increment, Decrement } = counterSlice.actions;

export default counterSlice.reducer;
