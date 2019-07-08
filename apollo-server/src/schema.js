const {gql} = require('apollo-server');

const typedefs = gql`

    type Movie {
        id: ID!
        title: String!
        popularity: Float
        released: String
        poster: String
        votes: Int
        overview: String
        
    }
    type Review {
        id: ID!
        url: String
        author: String
    }

    type MovieDetails {
        id: ID!
        genres: [String]
        budget: Int
        revenue: Int
        runtime: String
        overview: String
        title: String
        productionCountries: [String]
        backdrop: String
        poster: String
    }

    type MovieImage {
        id: ID!
        filePath: String
        width: Int
        height: Int
    }

    type MovieVideo {
        id: ID!
        key: String
        name: String
        size: Int
        type: String
        source: String
    }

    type Query {
        search(
            query: String!
            year: Int
        ): [Movie]
        review(movieId: ID!): [Review]
        movieDetails(movieId: ID!): MovieDetails
        movieImages(movieId: ID!): [MovieImage]
        movieVideos(movieId: ID!): [MovieVideo]
        similarMovies(movieId: ID!): [Movie]
    }
`;

module.exports = typedefs;