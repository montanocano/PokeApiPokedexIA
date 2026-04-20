import axios, { AxiosError } from "axios";
import type { ApiError } from "./types";

const client = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 10000,
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
