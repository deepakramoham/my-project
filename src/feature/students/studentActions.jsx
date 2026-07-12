import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

export const getAllStudents = createAsyncThunk(
  "student/getAllStudents",
  async (_, { rejectWithValue }) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await apiClient.get("/students");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Some thing went wrong");
    }
  },
);

export const postStudentData = createAsyncThunk(
  "student/postStudentData",
  async (data) => {
    const response = await apiClient.post("/students", data);
   
    return response?.data?.student;
  },
);

export const updateStudentData = createAsyncThunk(
  "student/updateStudentData",
  async ({ studentId, studentData }) => {
    const response = await apiClient.put(`/students/${studentId}`, studentData);

    return response?.data?.student;
  },
);
export const deleteStudentData = createAsyncThunk(
  "student/deleteStudentData",
  async (id) => {
    const response = await apiClient.delete(`/students/${id}`);
    return response?.data?.deletedId;
  },
);
