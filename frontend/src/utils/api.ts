import axios from "axios";

const api = axios.create({
  baseURL: "https://horse-racing-api.patohru.qzz.io/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const isAuthRequest = (url?: string) =>
  !!url && (url.includes("/auth/login") || url.includes("/auth/register"));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && !isAuthRequest(error.config?.url)) {
      console.warn("API 401 Unauthorized — clearing session");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
