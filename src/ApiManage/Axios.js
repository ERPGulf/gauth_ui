import axios from "axios";
import { refreshToken } from "./ApiHelper";

const instance = axios.create({
  baseURL: "https://aysha.erpgulf.com/api/method/",
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      const originalRequest = error.config;

      // Check if the error is due to an expired token
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const token = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return instance(originalRequest);
      }
    } catch (error) {
      // For other errors, continue to reject the request
      return Promise.reject(`Error interceptor: ${error}`);
    }
  }
);

export default instance;
