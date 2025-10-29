import axios from "axios";
 
const API_BASE_URL: string = "https://jsonplaceholder.typicode.com/";
 
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});