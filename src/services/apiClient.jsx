import axios from "axios";

const BASE_URL = "http://localhost:3500";
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default apiClient;
