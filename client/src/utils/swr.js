import { getEvent, getEvents } from "./event";
import { getGroup, getGroups } from "./group";
import { getMessages } from "./message";
import useSWR from "swr";
import { getUser } from "./user";

// NOTE: the strings I pass into swr don't act as endpoints.
// They're just unique identifiers so swr can check if a
// cached value for the same request has been made. It can
// technically be anything (hashable) that uniquely identifies the
// request.

export function useGroups({ ownerId, name, description, userIds }) {
  return useSWR(
    `/group?name=${name}&description=${description}&userIds=${userIds.join(
      ","
    )}`,
    async () => (await getGroups({ ownerId, name, description, userIds })).data
  );
}

export function useGroup({ groupId }) {
  return useSWR(
    `/group/${groupId}`,
    async () => (await getGroup({ groupId })).data
  );
}

export function useEvents({
  groupId,
  before,
  after,
  name,
  description,
  startDate,
  endDate,
}) {
  return useSWR(
    `/group/${groupId}/event?before=${before}&after=${after}&name=${name}&description=${description}&startDate=${startDate}&endDate=${endDate}`,
    async () =>
      (
        await getEvents({
          groupId,
          before,
          after,
          name,
          description,
          startDate,
          endDate,
        })
      ).data
  );
}

export function useEvent({ groupId, eventId }) {
  return useSWR(
    `/group/${groupId}/event/${eventId}`,
    async () => (await getEvent({ groupId, eventId })).data
  );
}

export function useMessages({ groupId, eventId }) {
  return useSWR(
    `/group/${groupId}/event/${eventId}/message`,
    async () => (await getMessages({ groupId, eventId })).data
  );
}

export function useUser({ userId }) {
  return useSWR(
    `/user/${userId}`,
    async () => (await getUser({ userId })).data
  );
}
