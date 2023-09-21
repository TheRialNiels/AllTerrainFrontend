import axios from "axios";
import { useAuth } from "@/stores/auth";

const baseURL = "http://34.171.128.2:8000/";

export const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config: any) => {
  const token = useAuth().getToken;
  config.url = baseURL + config.url;

  if (
    config.url.includes("api/auth/login/") ||
    config.url.includes("api/auth/create-encargado/")
  ) {
    return config;
  }

  config.headers.Authorization = `Token ${token}`;
  return config;
});
