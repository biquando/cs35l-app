import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSearch } from "../utils/swr";
import NavBar from "./NavBar";

function SearchPage(props) {
  const search = useLocation().search;
  const queryString = new URLSearchParams(search).get("query");

  const { data: searchResults, mutate } = useSearch({ query: queryString });

  useEffect(mutate, [searchResults]);

  return (
    <div>
      <NavBar />
      <h1>Search: {queryString}</h1>
      {!searchResults ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <ul>
            {searchResults?.groups.map((g) => (
              <li>Group: {g.name}</li>
            ))}
          </ul>
          <ul>
            {searchResults?.events.map((e) => (
              <li>Event: {e.name}</li>
            ))}
          </ul>
          <ul>
            {searchResults?.messages.map((m) => (
              <li>Message: {m.text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
