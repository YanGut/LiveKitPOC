import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

export const apiClient = axios.create({
  baseURL: configuredApiUrl && configuredApiUrl.length > 0 ? configuredApiUrl : undefined,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
