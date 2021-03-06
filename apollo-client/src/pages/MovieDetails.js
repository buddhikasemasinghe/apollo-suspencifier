import React, {useContext, Suspense} from "react";
import {
    Container,
    Grid,
    Embed,
    Header,
    Segment,
    Image,
    ImageGroup, GridColumn
} from "semantic-ui-react";
import gql from "graphql-tag";
import {Spinner} from "../components/Spinner";
import {useQuery} from "react-apollo-hooks";
import PlaceHolder from "../components/PlaceHolder";
import {navigate} from "@reach/router";
import SuspenseContext from "../SuspenseContext";
import ImageSuspense from "../components/ImageSuspense";

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

const MOVIE_IMAGES = gql`
  query MovieImages($movieId: ID!) {
    movieImages(movieId: $movieId) {
      width
      height
      filePath
    }
  }
`;

const MOVIE_VIDEOS = gql`
  query MovieVideos($movieId: ID!) {
    movieVideos(movieId: $movieId) {
      key
      source
      name
    }
  }
`;

const SIMILAR_MOVIES = gql`
  query SimilarMovies($movieId: ID!) {
    similarMovies(movieId: $movieId) {
      title
      id
      poster
    }
  }
`;

const sleep = ms => new Promise(r => setTimeout(r, ms));

const MovieDetailsLazyLoaded = React.lazy(async () => {
    await sleep(5000);
    return import("./MovieDetailsLazyLoaded.js");
});

export const MovieDetails = props => {
    const {
        state: {movieId}
    } = props.location;
    const {suspend} = useContext(SuspenseContext);
    const {data, loading, error} = useQuery(MOVIE_DETAILS, {
        variables: {movieId: movieId},
        suspend: suspend
    });
    if (loading) return <Spinner loadingText="Loading Movie Details ...."/>;
    if (error) return <p>ERROR</p>;
    const movie = data.movieDetails;
    return (
        <Container style={{margin: 20}}>
            <Header as="h1" dividing>
                {movie.title}
            </Header>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <MovieSummary movie={movie}/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Suspense fallback={<PlaceHolder/>}>
                            <MovieDetailsLazyLoaded movie={movie}/>
                        </Suspense>
                    </Grid.Column>
                </Grid.Row>
                <Suspense fallback={<Spinner loadingText="Loading other details.."/>}>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Segment>
                                <MovieImages movieId={movieId}/>
                            </Segment>
                            <Segment>
                                <MovieVideos movieId={movieId}/>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Segment>
                                <MoviesRelated movieId={movieId}/>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Suspense>
            </Grid>
        </Container>
    );
};

const MovieSummary = ({movie}) => (
    <Segment attached="top">
        <Header as="h2" content="Overview"/>
        <p>{movie.overview}</p>
    </Segment>
);

const MovieImages = ({movieId}) => {
    const {suspend} = useContext(SuspenseContext);
    const {data, loading, error} = useQuery(MOVIE_IMAGES, {
        variables: {movieId: movieId},
        suspend: suspend
    });
    if (loading) return <PlaceHolder/>;
    if (error) return <p>ERROR</p>;
    const images = data.movieImages.map((image, i) => (
        // <Image key={i} src={image.filePath} />
        <Grid.Column key={i}>
            <ImageSuspense image={image.filePath} nr={i}/>
        </Grid.Column>
    ));
    // return <ImageGroup size="small">{images}</ImageGroup>;
    return (
        <Grid relaxed columns={4}>
            {images}
        </Grid>
    );
};

const MovieVideos = ({movieId}) => {
    const {suspend} = useContext(SuspenseContext);
    const {data, loading, error} = useQuery(MOVIE_VIDEOS, {
        variables: {movieId: movieId},
        suspend: suspend
    });
    if (loading) return <PlaceHolder/>;
    if (error) return <p>ERROR</p>;
    const videos = data.movieVideos.map((video, i) => (
        <Grid.Column key={i}>
            <Embed id={video.key} source={video.source}/>
        </Grid.Column>
    ));
    return (
        <Grid relaxed columns={4}>
            {videos}
        </Grid>
    );
};

const MoviesRelated = ({movieId}) => {
    const {suspend} = useContext(SuspenseContext);
    const {data, loading, error} = useQuery(SIMILAR_MOVIES, {
        variables: {movieId: movieId},
        suspend: suspend
    });
    if (loading) return <PlaceHolder/>;
    if (error) return <p>ERROR</p>;
    const similarMovies = data.similarMovies.map((movie, i) => (
        <Image
            key={i}
            src={movie.poster}
            style={{maxWidth: "60px"}}
            onClick={() =>
                navigate("/movieDetails", {state: {movieId: movie.id}})
            }
        />
    ));
    return (
        <>
            <Header as="h3" content="More like this .."/>
            <ImageGroup>{similarMovies}</ImageGroup>
        </>
    );
};
