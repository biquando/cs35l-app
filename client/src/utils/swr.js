import { getEvent, getEvents } from "./event";
import { getGroup, getGroups } from "./group";
import { getMessages } from "./message";
import useSWR from "swr";
import { getUser } from "./user";
import { getSearch } from "./search";

// NOTE: the strings I pass into swr don't act as endpoints.
// They're just unique identifiers so swr can check if a
// cached value for the same request has been made. It can
// technically be anything (hashable) that uniquely identifies the
// request.

export function useGroups(
  { ownerId, name, description, userIds },
  isReady = true
) {
  return useSWR(
    isReady
      ? `/group?name=${name}&description=${description}&userIds=${userIds.join(
          ","
        )}`
      : null,
    async () => (await getGroups({ ownerId, name, description, userIds })).data
  );
}

export function useGroup({ groupId }, isReady = true) {
  return useSWR(
    isReady ? `/group/${groupId}` : null,
    async () => (await getGroup({ groupId })).data
  );
}

export function useEvents(
  { groupId, before, after, name, description, startDate, endDate },
  isReady = true
) {
  return useSWR(
    isReady
      ? `/group/${groupId}/event?before=${before}&after=${after}&name=${name}&description=${description}&startDate=${startDate}&endDate=${endDate}`
      : null,
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

export function useEvent({ groupId, eventId }, isReady = true) {
  return useSWR(
    isReady ? `/group/${groupId}/event/${eventId}` : null,
    async () => (await getEvent({ groupId, eventId })).data
  );
}

export function useMessages({ groupId, eventId }, isReady = true) {
  return useSWR(
    isReady ? `/group/${groupId}/event/${eventId}/message` : null,
    async () => (await getMessages({ groupId, eventId })).data,
    {
      refreshInterval:
        // pings server every 1 second, not very efficient but makes it realtime.
        1000,
    }
  );
}

export function useUser({ userId }, isReady = true) {
  return useSWR(
    isReady ? `/user/${userId}` : null,
    async () => (await getUser({ userId })).data
  );
}

export function useSearch({ query }, isReady = true) {
  return useSWR(
    isReady ? `/search/${query}` : null,
    async () => (await getSearch({ query })).data
  );
}
