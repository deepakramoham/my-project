import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCourses,
  postCourseData,
  updateCourse,
  deleteCourse,
} from "./courseActions";

const initialState = {
  onload: false,
  modalOpen: false,
  loading: false,
  error: null,
  courses: [],
  status: "idle", //idle, pending, success, failed
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalOpen = true;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
        state.onload = true;
        state.status = "success";
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.status = "failed";
      })

      .addCase(postCourseData.pending, (state) => {
        state.loading = true;
        state.operationSuccess = false;
        state.status = "pending";
      })
      .addCase(postCourseData.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = [action.payload, ...state.courses];
        state.status = "success";
        state.modalOpen = false;
      })
      .addCase(postCourseData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
        state.modalOpen = true;
      })

      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.courses = state.courses.map((course) =>
          course.id === action.payload.id ? action.payload : course,
        );
        state.modalOpen = false;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.status = "failed";
        state.modalOpen = true;
      })

      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.courses = state.courses.filter(
          (course) => course.id !== action.payload,
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const selectAllCourses = (state) => state.course.courses;
export const { openModal, closeModal, resetStatus } = courseSlice.actions;
export default courseSlice.reducer;
