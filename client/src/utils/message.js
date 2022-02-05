import { apiClient } from "./apiClient";

export async function getMessages({ groupId, eventId }) {
  const result = await apiClient.get(
    `/group/${groupId}/event/${eventId}/message`
  );
  return result.data;
}

export async function createMessage({ groupId, eventId, text }) {
  const result = await apiClient.post(
    `/group/${groupId}/event/${eventId}/message`,
    { text }
  );
  return result.data;
}

export async function updateMessage({ groupId, eventId, messageId, text }) {
  const result = await apiClient.patch(
    `/group/${groupId}/event/${eventId}/message/${messageId}`,
    { text }
  );
  return result.data;
}

export async function deleteMessage({ groupId, eventId, messageId }) {
  const result = await apiClient.delete(
    `/group/${groupId}/event/${eventId}/message/${messageId}`
  );
  return result.data;
}
