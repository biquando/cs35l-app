import React from "react";
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
  const { data: messages, isValidating: isValidatingMessages } = useMessages(
    { groupId: selectedGroup?._id, eventId: selectedEvent?._id },
    selectedGroup && selectedEvent
  );

  React.useEffect(() => {
    if (groups) {
      setSelectedGroup(getInitialGroup(groups));
    }
  }, [!!groups]);
  React.useEffect(() => {
    if (events) {
      setSelectedEvent(getInitialEvent(events, selectedEvent));
    }
  }, [!!events]);

  const isGroupsLoading = !groups && isValidatingGroups;
  const isEventsLoading = isGroupsLoading || (!events && isValidatingEvents);
  const isMessagesLoading =
    isEventsLoading || (!messages && isValidatingMessages);

  async function handlePostMessage(text) {
    await createMessage({
      eventId: selectedEvent._id,
      groupId: selectedGroup._id,
      text,
    });
  }

  return (
    <div className="page-wrapper">
      <NavBar />
      <div className="body-wrapper">
        <Groups
          groups={groups}
          selectedGroup={selectedGroup}
          onChangeGroup={setSelectedGroup}
          loading={isGroupsLoading}
        />
        <Timeline
          events={events}
          selectedEvent={selectedEvent}
          selectedGroup={selectedGroup}
          onChangeEvent={setSelectedEvent}
          loading={isEventsLoading}
        />
        <Comments
          messages={messages}
          loading={isMessagesLoading}
          onPostMessage={handlePostMessage}
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
  if (storedGroupId) {
    return groups.find((group) => group._id === storedGroupId);
  } else {
    localStorage.setItem(SELECTED_GROUP_KEY, groups[0]._id);
    return groups[0];
  }
}

function getInitialEvent(events, selectedGroup) {
  if (!events.length) return null;
  const eventKey = getEventKey(selectedGroup._id);
  const storedEventId = localStorage.getItem(eventKey);
  if (storedEventId) {
    return events.find((event) => event._id === storedEventId);
  } else {
    localStorage.setItem(eventKey, events[0]._id);
    return events[0];
  }
}
