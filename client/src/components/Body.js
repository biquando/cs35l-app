import React, { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import "../styles/body.css";

import NavBar from "./NavBar";
import Groups from "./body/Groups";
import Timeline from "./body/Timeline";
import Comments from "./body/Comments";
import { useAuth } from "../contexts/AuthContext";
import { useEvents, useGroups, useMessages } from "../utils/swr";
import { createMessage } from "../utils/message";
import { joinGroup } from "../utils/group";

function Body(props) {
  const [selectedGroup, setSelectedGroup] = React.useState(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { token } = useAuth();

  const [joinedGroupId, setJoinedGroupId] = React.useState(null);

  const { user } = useAuth();
  const {
    data: groups,
    isValidating: isValidatingGroups,
    mutate: mutateGroups,
  } = useGroups({ userIds: [user?._id] }, !!user);
  const { data: events, isValidating: isValidatingEvents } = useEvents(
    { groupId: selectedGroup?._id },
    !!selectedGroup
  );
  const {
    data: messages,
    isValidating: isValidatingMessages,
    mutate: mutateMessages,
  } = useMessages(
    { groupId: selectedGroup?._id, eventId: selectedEvent?._id },
    selectedGroup && selectedEvent
  );

  React.useEffect(() => {
    const queryJoinGroupId = searchParams.get("join");
    const localStorageJoinGroupId = localStorage.getItem(JOIN_GROUP_ID);
    const joinGroupId = queryJoinGroupId || localStorageJoinGroupId;
    if (token && (queryJoinGroupId || localStorageJoinGroupId)) {
      handleJoinGroup(joinGroupId);
      localStorage.removeItem(JOIN_GROUP_ID);
    }
  }, [!!token]);

  React.useEffect(() => {
    if (joinedGroupId) {
      const joinedGroup = groups.find((group) => group._id === joinedGroupId);
      if (joinedGroup) {
        setSelectedGroup(joinedGroup);
        setJoinedGroupId(null);
      }
    }
  }, [joinedGroupId, groups]);

  React.useEffect(() => {
    if (!groups || selectedGroup || isValidatingGroups) return;
    const initialGroup =
      groups.find((group) => group._id === searchParams.get("group_id")) ||
      getInitialGroup(groups);
    setSelectedGroup(initialGroup);
  }, [!!groups, isValidatingGroups]);
  React.useEffect(() => {
    if (selectedEvent || !events || isValidatingEvents) return;

    const initialEvent = getInitialEvent(events, selectedGroup);
    setSelectedEvent(
      events.find((event) => event._id === searchParams.get("event_id")) ||
        initialEvent
    );
  }, [!!events, isValidatingEvents]);

  React.useEffect(() => {
    if (!events) return;

    const initialEvent = getInitialEvent(events, selectedGroup);
    setSelectedEvent(
      events.find((event) => event._id === searchParams.get("event_id")) ||
        initialEvent
    );
  }, [selectedGroup?._id, !!events]);

  async function handleJoinGroup(joinGroupId) {
    await joinGroup({ groupId: joinGroupId });
    setJoinedGroupId(joinGroupId);
    mutateGroups();
  }

  function handleChangeGroup(group) {
    setSelectedGroup(group);
    console.log({ group });
    localStorage.setItem(SELECTED_GROUP_KEY, group._id);
  }

  function handleChangeEvent(event) {
    setSelectedEvent(event);
    localStorage.setItem(getEventKey(selectedGroup._id), event._id);
  }

  async function handlePostMessage(text) {
    console.log({ text });
    await createMessage({
      eventId: selectedEvent._id,
      groupId: selectedGroup._id,
      text,
    });
    mutateMessages();
  }

  const isGroupsLoading = !groups && isValidatingGroups;
  const isEventsLoading = isGroupsLoading || (!events && isValidatingEvents);
  const isMessagesLoading =
    isEventsLoading || (!messages && isValidatingMessages);

  return (
    <div className="page-wrapper">
      <NavBar />
      <div className="body-wrapper">
        <Groups
          groups={groups}
          selectedGroup={selectedGroup}
          onChangeGroup={handleChangeGroup}
          loading={isGroupsLoading}
          refreshGroups={mutateGroups}
        />
        <Timeline
          events={events}
          selectedEvent={selectedEvent}
          selectedGroup={selectedGroup}
          onChangeEvent={handleChangeEvent}
          loading={isEventsLoading}
        />
        <Comments
          messages={messages}
          loading={isMessagesLoading}
          onPostMessage={handlePostMessage}
          disabled={!selectedEvent}
          selectedEvent={selectedEvent}
          highlightedMessageId={searchParams.get("message_id")}
        />
      </div>
    </div>
  );
}

export default Body;

const SELECTED_GROUP_KEY = "selectedGroup";
const JOIN_GROUP_ID = "joinGroupId";
const getEventKey = (groupId) => `selectedEvent-${groupId}`;

function getInitialGroup(groups) {
  if (!groups.length) return null;
  const storedGroupId = localStorage.getItem(SELECTED_GROUP_KEY);
  const initialGroup =
    groups.find((group) => group._id === storedGroupId) || groups[0];
  localStorage.setItem(SELECTED_GROUP_KEY, initialGroup._id);
  return initialGroup;
}

function getInitialEvent(events, selectedGroup) {
  if (!events.length) return null;
  const eventKey = getEventKey(selectedGroup?._id);
  const storedEventId = localStorage.getItem(eventKey);
  if (storedEventId) {
    return events.find((event) => event._id === storedEventId);
  } else {
    localStorage.setItem(eventKey, events[0]._id);
    return events[0];
  }
}
