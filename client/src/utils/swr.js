import { getEvent, getEvents } from "./event";
import { getGroup, getGroups } from "./group";
import { getMessages } from "./message";
import useSWR from "swr";

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
    async () => getGroups({ ownerId, name, description, userIds })
  );
}

export function useGroup({ groupId }) {
  return useSWR(`/group/${groupId}`, async () => getGroup({ groupId }));
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
      getEvents({
        groupId,
        before,
        after,
        name,
        description,
        startDate,
        endDate,
      })
  );
}

export function useEvent({ groupId, eventId }) {
  return useSWR(`/group/${groupId}/event/${eventId}`, async () =>
    getEvent({ groupId, eventId })
  );
}

export function useMessages({ groupId, eventId }) {
  return useSWR(`/group/${groupId}/event/${eventId}/message`, async () =>
    getMessages({ groupId, eventId })
  );
}
