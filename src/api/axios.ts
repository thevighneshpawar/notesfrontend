import axios, {
  type AxiosResponse,
  AxiosError,
  type AxiosRequestConfig,
} from "axios";
import { refreshAccessToken } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // backend base URL
  withCredentials: true, // send HttpOnly cookies
});

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  url?: string;
}

// Track if we're currently refreshing to prevent multiple simultaneous attempts
let isRefreshing = false;

// Response interceptor - handle 401 and refresh token
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      // Check if this is a refresh token request that failed
      if (
        originalRequest.url?.includes("/refresh") ||
        originalRequest.url?.includes("/me")
      ) {
        // Refresh token request failed, redirect to signin

        return Promise.reject(error);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshAccessToken();

        // Retry the original request (cookies will be updated automatically)
        return api(originalRequest as AxiosRequestConfig);
      } catch (refreshError) {
        // Refresh failed, redirect to signin
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
