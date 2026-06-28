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
  operationSuccess: false,
 
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
  clearOperationSuccess: (state) => {
    state.operationSuccess = false;
  },
},
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
        state.operationSuccess = false;
      })
      .addCase(postCourseData.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = [action.payload, ...state.courses];
      state.operationSuccess = true;
      })
      .addCase(postCourseData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.operationSuccess = false;
      })

      .addCase(updateCourse.pending, (state, action) => {
        state.loading = true;
        state.operationSuccess = false;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
state.operationSuccess = true;
        state.courses = state.courses.map((course) =>
          course.id === action.payload.id ? action.payload : course,
        );
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.operationSuccess = false;
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
export const { clearOperationSuccess } = courseSlice.actions;
export default courseSlice.reducer;
