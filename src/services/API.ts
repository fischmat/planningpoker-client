import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export const apiBaseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:8080/api" : "/api";

export const jar = new CookieJar();
export const api = wrapper(
  axios.create({
    baseURL: apiBaseUrl,
    jar: jar,
    withCredentials: true
  })
);
