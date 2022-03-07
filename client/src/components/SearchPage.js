import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../utils/swr";
import { useSearch } from "../utils/swr";
import NavBar from "./NavBar";
import "../styles/searchpage.css";
import { joinGroup } from "../utils/group";

function SearchPage(props) {
  const search = useLocation().search;
  const queryString = new URLSearchParams(search).get("query");
  const navigate = useNavigate();

  const { user: originalUser } = useAuth();
  const { data: user, mutate: mutateUser } = useUser(
    {
      userId: originalUser?._id,
    },
    !!originalUser
  );
  const {
    data: searchResults,
    isValidating,
    mutate,
  } = useSearch({ query: queryString });

  async function handleJoinGroup(groupId) {
    await joinGroup({ groupId });
    mutate();
    mutateUser();
    navigate(`/?open=group&group_id=${groupId}`);
  }

  return (
    <div>
      <NavBar searchText={queryString} />
      {!searchResults || !user ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="search-container">
          <div className="inner-search-container">
            {searchResults.groups.length !== 0 && (
              <div>
                <h4>Groups</h4>
                <ul className="list-group">
                  {searchResults.groups.map((g) =>
                    user.group_ids.includes(g._id.toString()) ? (
                      <Link
                        to={`/?open=group&group_id=${g._id}`}
                        key={g._id}
                        className="list-group-item"
                      >
                        <div className="fw-bold">{g.name}</div>
                        {g.description}
                      </Link>
                    ) : (
                      <li key={g._id} className="list-group-item">
                        <div className="fw-bold">
                          {g.name}
                          <button
                            className="badge rounded-pill bg-primary"
                            onClick={() => handleJoinGroup(g._id)}
                          >
                            Join
                          </button>
                        </div>

                        {g.description}
                      </li>
                    )
                  )}
                </ul>
                <br />
              </div>
            )}
            {searchResults.events.length !== 0 && (
              <div>
                <h4>Events</h4>
                <ul className="list-group">
                  {searchResults.events.map((e) => (
                    <Link
                      to={`/?open=event&group_id=${e.group_id}&event_id=${e._id}`}
                      key={e._id}
                      className="list-group-item"
                    >
                      <div className="fw-bold">{e.name}</div>
                      {e.description}
                    </Link>
                  ))}
                </ul>
                <br />
              </div>
            )}
            {searchResults.messages.length !== 0 && (
              <div>
                <h4>Messages</h4>
                <ul className="list-group">
                  {searchResults.messages.map((m) => (
                    <Link
                      to={`/?open=message&group_id=${
                        searchResults.messageGroupMap[m._id]
                      }&event_id=${m.event_id}&message_id=${m._id}`}
                      key={m._id}
                      className="list-group-item"
                    >
                      <div className="fw-bold">{m.username}</div>
                      {m.text}
                    </Link>
                  ))}
                </ul>
                <br />
              </div>
            )}
            {searchResults.groups.length === 0 &&
              searchResults.events.length === 0 &&
              searchResults.messages.length === 0 && <p>No results.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
