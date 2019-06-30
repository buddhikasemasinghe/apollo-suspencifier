import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import { Navigation } from "./pages/Navigation";
import { MovieSearch } from "./pages/MovieSearch";
import { MovieReviews } from "./pages/MovieReviews";
import { MovieDetails } from "./pages/MovieDetails";
import { Movies } from "./pages/Movies";
import { ApolloProvider } from "react-apollo";
import { Client } from "./ApolloClient";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <ApolloProvider client={Client}>
      <ApolloHooksProvider client={Client}>
        <Router>
          <Navigation default>
            <MovieSearch default />
            <Movies path="movies" />
            <MovieDetails path="movieDetails" />
            <MovieReviews path="moviewReview" />
          </Navigation>
        </Router>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default App;
