import { apiClient } from "./apiClient";

export async function getUser({ userId }) {
  const result = await apiClient.get(`/user/${userId}}`);
  return result.data;
}

export async function updateUser({ userId, updates }) {
  const result = await apiClient.patch(`/user/${userId}}`, updates);
  return result.data;
}
