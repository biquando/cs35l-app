import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSearch } from "../utils/swr";
import NavBar from "./NavBar";

function SearchPage(props) {
  const search = useLocation().search;
  const queryString = new URLSearchParams(search).get("query");

  const {
    data: searchResults,
    isValidating,
    mutate,
  } = useSearch({ query: queryString });

  useEffect(mutate, [isValidating]);

  return (
    <div>
      <NavBar searchText={queryString} />
      <h2>Search: "{queryString}"</h2>
      {!searchResults ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          {searchResults.groups.length !== 0 && (
            <div>
              <h4>Groups</h4>
              <ul className="list-group">
                {searchResults.groups.map((g) => (
                  <Link
                    to={`/?open=group&group_id=${g._id}`}
                    key={g._id}
                    className="list-group-item"
                  >
                    <div className="fw-bold">{g.name}</div>
                    {g.description}
                  </Link>
                ))}
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
      )}
    </div>
  );
}

export default SearchPage;
