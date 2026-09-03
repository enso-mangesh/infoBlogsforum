import axios from "axios";

import { CONFIG } from "@/core/config/constants";

const apiBaseUrl = CONFIG.API_URL || "https://api-infocalling.prefiks.in";

console.log("API URL:", apiBaseUrl);

export const serverApi = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30000,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

serverApi.interceptors.request.use(
  (config) => {
    console.log("Request URL:", config.baseURL, config.url);

    if (!CONFIG.API_TOKEN) {
      console.warn("API_TOKEN is missing. Add it to the project-root .env.local");
    }

    if (CONFIG.API_TOKEN) {
      config.headers.Authorization = `Bearer ${CONFIG.API_TOKEN}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);