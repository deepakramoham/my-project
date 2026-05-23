import axios from "axios";
import { getStore } from "../main";

const BASE_URL = "http://localhost:3500";
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (request) => {
    const token = getStore()?.getState()?.userState?.user?.accessToken;
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    console.log(request);
    return request;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    if (error?.response?.status === 403) {
      localStorage.removeItem("user");
      window.location.href = "/sign-in";
    }
  },
);

export default apiClient;
