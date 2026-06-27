import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCourses,
  postCourseData,
  updateCourse,
  deleteCourse,
} from "./courseActions";

const initialState = {
  onload: false,
  loading: false,
  error: null,
  courses: [],
  status: "idle", //success, failed, loading
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
        state.onload = true;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(postCourseData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postCourseData.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = [action.payload, ...state.courses];
      })
      .addCase(postCourseData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCourse.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;

        state.courses = state.courses.map((course) =>
          course.id === action.payload.id ? action.payload : course,
        );
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(deleteCourse.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;

        state.courses = state.courses.filter(
          (course) => course.id !== action.payload,
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const selectAllCourses = (state) => state.course.courses;

export default courseSlice.reducer;
