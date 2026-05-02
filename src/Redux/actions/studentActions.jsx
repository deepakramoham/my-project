import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllStudents = createAsyncThunk(
  "student/getAllStudents",
  async () => {
    const response = await fetch("http://localhost:3500/student");
    const result = await response.json();
    return result;
  },
);

export const postStudentData = createAsyncThunk(
  "student/postStudentData",
  async (data) => {
    const response = await fetch("http://localhost:3500/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  },
);
export const updateStudentData = createAsyncThunk(
  "student/updateStudentData",
  async ({ studentId, studentData }, thunkAPI) => {
    console.log(studentId, studentData, thunkAPI);
    const response = await fetch(
      `http://localhost:3500/students/${studentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      },
    );

    const result = await response.json();

    return result;
  },
);
export const deleteStudentData = createAsyncThunk(
  "student/deleteStudentData",
  async (id) => {
    const response = await fetch(`http://localhost:3500/students/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    return id;
  },
);
