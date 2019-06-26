const {gql} = require('apollo-server');

const typedefs = gql`

    type Movie {
        id: ID!
        title: String!
        popularity: Float
        released: String
        poster: String
        votes: Int
        
    }
    type Review {
        id: ID!
        url: String
        author: String
    }

    type Query {
        search(
            query: String!
            year: Int
        ): [Movie]
        review(movieId: ID!): [Review]
    }
`;

module.exports = typedefs;