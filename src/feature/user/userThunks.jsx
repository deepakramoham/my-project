import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

export const register = createAsyncThunk("user/register", async (userData) => {
  const response = await apiClient.post("/register", userData);
  return response?.data;
});

export const login = createAsyncThunk("user/login", async (userData) => {
  const response = await apiClient.post("/login", userData);
  if (response?.data) {
    localStorage.setItem("user", JSON.stringify(response?.data));
  }

  return response?.data;
});
