import axios from "axios";

import { CONFIG } from "@/core/config/constants";

console.log("API URL:", CONFIG.API_URL);

export const serverApi = axios.create({
  baseURL: CONFIG.API_URL,
  timeout: 30000,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

serverApi.interceptors.request.use(
  (config) => {
    console.log("Request URL:", config.baseURL, config.url);

    if (CONFIG.API_TOKEN) {
      config.headers.Authorization = `Bearer ${CONFIG.API_TOKEN}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);