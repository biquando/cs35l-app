import { apiClient } from "./apiClient";

export async function getSearch({ query }) {
  const result = await apiClient.get(`/search?query=${query}`);
  return result.data;
}
