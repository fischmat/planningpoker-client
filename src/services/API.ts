import axios from 'axios'

export const apiBaseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:8080/api" : "/api";

export const api = axios.create({
  baseURL: apiBaseUrl,
});
