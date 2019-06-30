import React from "react";
import { navigate } from "@reach/router";

export const MovieSearch = () => {
  const [searchText, setSearchText] = React.useState("Spiderman");

  return (
    <div>
      Search Movie
      <div>
        <input
          name="search Movie"
          placeholder="Search ...."
          onChange={event => setSearchText(event.target.value)}
        ></input>
      </div>
      <button
        onClick={() => {
          console.log(searchText);
          navigate("/movies", { state: { text: searchText } });
        }}
      >
        Search
      </button>
    </div>
  );
};
