import axios, { AxiosError, AxiosInstance } from "axios";

const AUTH_SERVICE_BASE_URL = "http://localhost:8080";

let authServiceAxiosInstance: AxiosInstance | null = null;

const getAuthServiceAxiosInstance = (): AxiosInstance => {
  if (!authServiceAxiosInstance) {
    authServiceAxiosInstance = axios.create({
      baseURL: AUTH_SERVICE_BASE_URL,
      timeout: 1000,
    });
  }

  return authServiceAxiosInstance;
};

export { getAuthServiceAxiosInstance };
