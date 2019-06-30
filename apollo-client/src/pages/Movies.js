import React from "react";
import gql from "graphql-tag";
import { Spinner } from "../components/Spinner";
import { useQuery } from "react-apollo-hooks";
import {
  Container,
  Card,
  Grid,
  Image,
  GridRow,
  GridColumn
} from "semantic-ui-react";
import { navigate } from "@reach/router";

const SEARCHMOVIES = gql`
  query SearchMovies($query: String!) {
    search(query: $query) {
      title
      id
      popularity
      released
      poster
      overview
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
    <Container>
      <MovieList data={data} />
    </Container>
  );
};

const MovieList = ({ data }) => {
  const movieList =
    data && data.search.length ? movieGrids(data.search) : <div></div>;
  return <Grid columns={3}>{movieList}</Grid>;
};

const movieGrids = result => {
  const movies = [];
  const total = result.length;
  result.forEach((item, i) => {
    if (i % 3 === 0) {
      movies.push([
        [item],
        i + 1 <= total ? [result[i + 1]] : [],
        i + 2 <= total ? [result[i + 2]] : []
      ]);
    }
  });
  return movies.map((movieRow, i) => (
    <GridRow key={i}>
      {movieRow.map(movie => displayMovieSummary(movie[0]))}
    </GridRow>
  ));
};

const displayMovieSummary = movie => {
  if (movie) {
    return (
      <GridColumn key={movie.id}>
        <Card
          onClick={() =>
            navigate("/movieDetails", { state: { movieId: movie.id } })
          }
        >
          <Image src={movie.poster} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{movie.title}</Card.Header>
            <Card.Meta>
              <span className="date">Released {movie.released}</span>
            </Card.Meta>
            <Card.Description>
              <span className="date">Popularity {movie.popularity}</span>
            </Card.Description>
          </Card.Content>
        </Card>
      </GridColumn>
    );
  }
  return <GridColumn key={"movie.id"}>No preview</GridColumn>;
};
