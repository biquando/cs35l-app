import { apiClient } from "./apiClient";

function addAuthTokenToApiClientHeader(token) {
  apiClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

export async function signUp({ username, password }) {
  const result = await apiClient.post("/auth/sign-up", { username, password });

  // If we reach this line, sign up is successful.
  const token = result.data.token;
  addAuthTokenToApiClientHeader(token);
  localStorage.setItem("authToken", token);

  return result.data;
}

export async function login({ username, password }) {
  const result = await apiClient.post("/auth/login", { username, password });
  const token = result.data.token;
  addAuthTokenToApiClientHeader(token);
  localStorage.setItem("authToken", token);
  return result.data;
}

export async function verifyToken(token = localStorage.getItem("authToken")) {
  const result = await apiClient.post("/auth/verify", { token });
  const newToken = result.data.token;
  addAuthTokenToApiClientHeader(newToken);
  localStorage.setItem("authToken", newToken);
  return result.data;
}
