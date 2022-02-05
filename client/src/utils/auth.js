import { apiClient } from "./apiClient";

export async function signUp({ username, password }) {
  const result = await apiClient.post("/auth/sign-up", { username, password });
  return result.data;
}

export async function login({ username, password }) {
  const result = await apiClient.post("/auth/login", { username, password });
  return result.data;
}

export async function refreshToken(token) {
  const result = await apiClient.post("/auth/verify", { token });
  return result.data;
}
