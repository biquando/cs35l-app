import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/body.css";

import NavBar from "./NavBar";
import Groups from "./body/Groups";
import Timeline from "./body/Timeline";
import Comments from "./body/Comments";
import { useAuth } from "../contexts/AuthContext";
import { useEvents, useGroups, useMessages } from "../utils/swr";
import { createMessage } from "../utils/message";

function Body(props) {
  const [selectedGroup, setSelectedGroup] = React.useState(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const { user } = useAuth();
  const { data: groups, isValidating: isValidatingGroups } = useGroups(
    { userIds: [user?._id] },
    !!user
  );
  const { data: events, isValidating: isValidatingEvents } = useEvents(
    { groupId: selectedGroup?._id },
    !!selectedGroup
  );
  const {
    data: messages,
    isValidating: isValidatingMessages,
    mutate,
  } = useMessages(
    { groupId: selectedGroup?._id, eventId: selectedEvent?._id },
    selectedGroup && selectedEvent
  );

  React.useEffect(() => {
    if (groups && !selectedGroup) {
      const initialGroup = getInitialGroup(groups);
      setSelectedGroup(initialGroup);
    }
  }, [!!groups]);
  React.useEffect(() => {
    if (selectedGroup && events) {
      setSelectedEvent(getInitialEvent(events, selectedGroup));
    }
  }, [selectedGroup?._id, !!events]);

  function handleChangeGroup(group) {
    setSelectedGroup(group);
    localStorage.setItem(SELECTED_GROUP_KEY, group._id);
  }

  function handleChangeEvent(event) {
    setSelectedEvent(event);
    localStorage.setItem(getEventKey(selectedGroup._id, event._id));
  }

  async function handlePostMessage(text) {
    console.log({ text });
    await createMessage({
      eventId: selectedEvent._id,
      groupId: selectedGroup._id,
      text,
    });
    mutate();
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
        />
      </div>
    </div>
  );
}

export default Body;

const SELECTED_GROUP_KEY = "selectedGroup";
const getEventKey = (groupId) => `selectedEvent-${groupId}`;

function getInitialGroup(groups) {
  if (!groups.length) return null;
  const storedGroupId = localStorage.getItem(SELECTED_GROUP_KEY);
  const initialGroup =
    groups.find((group) => group._id === storedGroupId) || groups[0];
  localStorage.setItem(SELECTED_GROUP_KEY, initialGroup);
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
