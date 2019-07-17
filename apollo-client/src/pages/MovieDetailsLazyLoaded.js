import React, { memo } from "react";
import { Card } from "semantic-ui-react";

const MovieDetailsLazyLoaded = ({ movie }) => (
  <>
    <Card image={movie.backdrop} header={movie.genres.join(", ")}></Card>
  </>
);
export default memo(MovieDetailsLazyLoaded, (prevProps, nextProps) => {
  return prevProps.movie === nextProps.movie;
});
