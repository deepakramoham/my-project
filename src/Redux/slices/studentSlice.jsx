import { createSlice } from "@reduxjs/toolkit";
import {
  getAllStudents,
  postStudentData,
  updateStudentData,
  deleteStudentData,
} from "../actions/studentActions";

const initialState = {
  onload: false,
  loading: false,
  error: null,
  students: [],
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.loading = false;
        state.onload = true;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        console.log(action)
        state.loading = false;
        state.error = action.error;
      })
      .addCase(postStudentData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postStudentData.fulfilled, (state, action) => {
        state.loading = false;
        state.students = [...state.students, action.payload];
      })
      .addCase(postStudentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updateStudentData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateStudentData.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student,
        );
      })
      .addCase(updateStudentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deleteStudentData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteStudentData.fulfilled, (state, action) => {
        state.loading = false;

        state.students = state.students.filter(
          (std) => std.id !== action.payload,
        );
      })
      .addCase(deleteStudentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default studentSlice.reducer;
