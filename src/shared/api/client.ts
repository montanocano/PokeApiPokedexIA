import axios, { AxiosError } from "axios";
import { API_BASE_URL, API_TIMEOUT_MS } from "../config";
import type { ApiError } from "./types";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
});

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      status: error.response?.status ?? 0,
      message:
        error.response?.data != null
          ? String(
              (error.response.data as { message?: string }).message ??
                error.message,
            )
          : error.message,
    };
    return Promise.reject(apiError);
  },
);

export default client;
