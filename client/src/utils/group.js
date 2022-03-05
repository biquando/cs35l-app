import { apiClient } from "./apiClient";
import { configureQueryString } from "./query";

export async function createGroup({ name, description }) {
  const result = await apiClient.post(`/group`, { name, description });
  return result.data;
}

export async function getGroups({ ownerId, name, description, userIds }) {
  const query = { ownerId, name, description };
  if (userIds?.length) query.user_ids = { $in: userIds };
  const queryString = configureQueryString(query);
  const result = await apiClient.get(`/group${queryString}`);
  return result.data;
}

export async function getGroup({ groupId }) {
  const result = await apiClient.get(`/group/${groupId}}`);
  return result.data;
}

export async function deleteGroup({ groupId }) {
  const result = await apiClient.delete(`/group/${groupId}`);
  return result.data;
}

export async function updateGroup({ groupId, updates }) {
  const result = await apiClient.patch(`/group/${groupId}`, updates);
  return result.data;
}

export async function joinGroup({ groupId }) {
  const result = await apiClient.post(`/group/${groupId}/join`);
  return result.data;
}

export async function leaveGroup({ groupId }) {
  const result = await apiClient.delete(`/group/${groupId}/leave`);
  return result.data;
}
