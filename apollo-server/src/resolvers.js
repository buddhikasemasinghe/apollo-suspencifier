const resolvers = {
    Query: {
        search: async(_, {query, year}, { dataSources}) => {
            const movies = await dataSources.movieAPI.searchMovies(query);
            console.log(movies);
            return movies;
        },
        review: async(_, {id }, { dataSources}) => {
            const movies = await dataSources.movieAPI.searchMovies(query);
            return movies;
        }
    },
  };  

module.exports = resolvers;