import React from "react";

export const MovieDetails = props => {
  const {
    state: { movieId }
  } = props.location;
  return <div>Movie Details {movieId}</div>;
};
