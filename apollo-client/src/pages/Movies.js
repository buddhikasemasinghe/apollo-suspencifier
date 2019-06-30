import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Spinner } from "../components/Spinner";
import { useQuery } from "react-apollo-hooks";

const SEARCHMOVIES = gql`
  query SearchMovies($query: String!) {
    search(query: $query) {
      title
      id
      popularity
      released
      poster
    }
  }
`;

export const Movies = props => {
  const {
    state: { text }
  } = props.location;
  const { data, loading, error } = useQuery(SEARCHMOVIES, {
    variables: { query: text },
    suspend: true
  });
  if (loading) return <Spinner />;
  if (error) return <p>ERROR</p>;
  return (
    <>
      <MovieList data={data} />
    </>
  );
};

function MovieList({ data }) {
  return (
    <div
      style={{
        margin: "0 auto"
      }}
    >
      <ol>
        {data && data.search.length
          ? data.search.map(movie => (
              <li key={movie.id}>
                <div>
                  <ul>
                    <li>{movie.title}</li>
                    <li>{movie.released}</li>
                    <li>{movie.poster}</li>
                  </ul>
                </div>
              </li>
            ))
          : "null"}
      </ol>
    </div>
  );
}
