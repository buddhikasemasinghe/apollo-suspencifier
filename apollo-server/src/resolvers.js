const resolvers = {
    Query: {
        search: async(_, {query, year}, { dataSources}) => {
            const movies = await dataSources.movieAPI.searchMovies(query);
            return movies;
        },
        review: async(_, {movieId }, { dataSources}) => {
            const movies = await dataSources.movieAPI.searchMovies(movieId);
            return movies;
        },
        movieDetails: async(_, {movieId }, { dataSources}) => {
            const movie = await dataSources.movieAPI.getMovieDetails(movieId);
            return movie;
        },
        movieImages: async(_, {movieId }, { dataSources}) => {
            const movie = await dataSources.movieAPI.getMovieImages(movieId);
            return movie;
        },
        movieVideos: async(_, {movieId }, { dataSources}) => {
            const movie = await dataSources.movieAPI.getMovieVideos(movieId);
            return movie;
        },
        similarMovies: async(_, {movieId }, { dataSources}) => {
            const movie = await dataSources.movieAPI.getSimilarMovies(movieId);
            return movie;
        }
    },
  };  

module.exports = resolvers;