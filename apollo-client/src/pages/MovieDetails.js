import React from "react";
import {
  Container,
  Header,
  Segment,
  Image,
  ImageGroup
} from "semantic-ui-react";
import gql from "graphql-tag";
import { Spinner } from "../components/Spinner";
import { useQuery } from "react-apollo-hooks";

const MOVIE_DETAILS = gql`
  query MovieDetail($movieId: ID!) {
    movieDetails(movieId: $movieId) {
      genres
      id
      title
      budget
      poster
      revenue
      runtime
      overview
      backdrop
      productionCountries
    }
  }
`;

export const MovieDetails = props => {
  const {
    state: { movieId }
  } = props.location;
  const { data, loading, error } = useQuery(MOVIE_DETAILS, {
    variables: { movieId: movieId },
    suspend: true
  });
  if (loading) return <Spinner loadingText="Please wait .." />;
  if (error) return <p>ERROR</p>;
  const movie = data.movieDetails;
  return (
    <Container style={{ margin: 20 }}>
      <Header as="h1" dividing>
        {movie.title}
      </Header>
      <MovieSummary movie={movie}></MovieSummary>
      <Segment attached="bottom">
        <MovieImages movieId={movieId} />
      </Segment>
    </Container>
  );
};

const MovieSummary = ({ movie }) => (
  <Segment attached="top">
    <Header as="h2" content="Overview" />
    <p>{movie.overview}</p>
  </Segment>
);

const MOVIE_IMAGES = gql`
  query MovieImages($movieId: ID!) {
    movieImages(movieId: $movieId) {
      width
      height
      filePath
    }
  }
`;

const MovieImages = ({ movieId }) => {
  const { data, loading, error } = useQuery(MOVIE_IMAGES, {
    variables: { movieId: movieId },
    suspend: true
  });
  if (loading) return <Spinner loadingText="Please wait .." />;
  if (error) return <p>ERROR</p>;
  const images = data.movieImages.map((image, i) => (
    <Image key={i} src={image.filePath} />
  ));
  return <ImageGroup size="small">{images}</ImageGroup>;
};
