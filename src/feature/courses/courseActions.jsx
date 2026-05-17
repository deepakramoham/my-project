import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

export const getAllCourses = createAsyncThunk(
  "course/getAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await apiClient.get("/courses");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

export const postCourseData = createAsyncThunk(
  "course/postCourseData",
  async (courseData) => {
    const response = await apiClient.post("/courses", courseData);

    console.log(response);

    return response?.data?.newCourse;
  },
);

export const updateCourse = createAsyncThunk(
  "course/updateCourse",
  async (courseData, thunkAPI) => {
    const response = await apiClient.put(
      `/courses/${courseData.id}`,
      courseData,
    );

    return response?.data?.course;
  },
);

export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (id) => {
    const response = await apiClient.delete(`/courses/${id}`);
    console.log(response);
    return response?.data?.deletedId;
  },
);
// export const getAllCourses = (controller) => async (dispatch) => {
//   try {
//     dispatch({ type: "GET_ALL_COURSES_PENDING" });
//     await new Promise((resolve) => setTimeout(resolve, 1000)); //simulating a network delay
//     const response = await fetch("http://localhost:3500/courses", {
//       signal: controller?.signal,
//     });
//     const courses = await response.json();
//     if (courses) {
//       dispatch({
//         type: "GET_ALL_COURSES_SUCCESS",
//         payload: courses,
//       });
//     }
//   } catch (err) {
//     if (err.name === "AbortError") {
//       console.log("Request was successfully cancelled");
//     }
//     dispatch({
//       type: "GET_ALL_COURSES_FAILED",
//       payload: err.message,
//     });
//   }
// };
// export const postCourseData = (courseData) => async (dispatch) => {
//   try {
//     const response = await fetch("http://localhost:3500/courses", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(courseData),
//     });

//     const data = await response.json();

//     dispatch({
//       type: "ADD_COURSE_SUCCESS",
//       payload: data,
//     });
//   } catch (err) {
//     console.log(err);
//     dispatch({ type: "ADD_COURSE_FAILED", payload: err });
//   }
// };
// export const updateCourse = (courseData) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `http://localhost:3500/courses/${courseData.id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(courseData),
//       },
//     );

//     const data = await response.json();

//     dispatch({
//       type: "UPDATE_COURSE_SUCCESS",
//       payload: data,
//     });
//   } catch (err) {
//     console.log(err);
//     dispatch({ type: "UPDATE_COURSE_FAILED", payload: err });
//   }
// };
// export const deleteCourse = (id) => async (dispatch) => {
//   try {
//     await fetch(`http://localhost:3500/courses/${id}`, {
//       method: "DELETE",
//     });

//     dispatch({
//       type: "DELETE_COURSE_SUCCESS",
//       payload: id,
//     });
//   } catch (err) {
//     console.log(err);
//     dispatch({ type: "DELETE_COURSE_FAILED", payload: err });
//   }
// };
