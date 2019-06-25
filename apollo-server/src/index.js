const { ApolloServer, gql } = require('apollo-server');

const dataSources = () => ({
    movieAPI: new 
});

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
    `;

  const resolvers = {
    Query: {
        books: () => books,
    },
  };  

  const books = [
      {
          title: 'The Davinci code',
          author: 'Dan brown',
          year: 1990
      },
      {
        title: 'Angels and deamons',
        author: 'Dan brown'
    }
  ]

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
    console.log(`Server is ready at ${ url}`);
});