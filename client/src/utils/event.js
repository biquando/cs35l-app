import { apiClient } from "./apiClient";
import { configureQueryString } from "./query";

export async function createEvent({
  name,
  description,
  groupId,
  startDate,
  endDate,
}) {
  let requestBody = {
    name,
    description,
    group_id: groupId,
    end_date: endDate,
  };
  // NOTE(omer): Adding start_date by default will treat not passing a value
  // as an existing property with value 'undefined'. Mongoose will be mad.
  if (startDate) requestBody.start_date = startDate;

  const result = await apiClient.post(`/group/${groupId}/event`, requestBody);
  return result.data;
}

export async function getEvents({
  groupId,
  before,
  after,
  name,
  description,
  startDate,
  endDate,
}) {
  let query = {};
  if (before) query.start_date = { $lt: before };
  if (after) query.end_date = { $gt: after };
  Object.assign(query, {
    name,
    description,
    startDate,
    endDate,
  });
  const queryString = configureQueryString(query);
  const result = await apiClient.get(`/group/${groupId}/event${queryString}`);
  return result.data;
}

export async function getEvent({ groupId, eventId }) {
  const result = await apiClient.get(`/group/${groupId}/event/${eventId}`);
  return result.data;
}

export async function updateEvent({ groupId, eventId, updates }) {
  const result = await apiClient.patch(
    `/group/${groupId}/event/${eventId}`,
    updates
  );
  return result.data;
}

export async function deleteEvent({ groupId, eventId }) {
  const result = await apiClient.delete(`/group/${groupId}/event/${eventId}`);
  return result.data;
}
