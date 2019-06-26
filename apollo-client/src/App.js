import React from 'react';
import {Router} from '@reach/router';
import './App.css';
import {Navigation} from "./pages/Navigation";
import {Authors} from "./pages/Authors";
import {AuthorDetails} from "./pages/AuthorDetails";

function App() {
  return (
    <Router>
      <Navigation default>
          <Authors default/>
          <AuthorDetails path="details"/>
      </Navigation>
    </Router>
  );
}

export default App;
