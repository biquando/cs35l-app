import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
      <NavBar />
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
                  <li className="list-group-item">
                    <div className="fw-bold">{g.name}</div>
                    {g.description}
                  </li>
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
                  <li className="list-group-item">
                    <div className="fw-bold">{e.name}</div>
                    {e.description}
                  </li>
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
                  <li className="list-group-item">
                    <div className="fw-bold">{m.username}</div>
                    {m.text}
                  </li>
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
