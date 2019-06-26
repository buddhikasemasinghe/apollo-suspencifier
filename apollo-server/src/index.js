require('dotenv').config();

const { ApolloServer} = require('apollo-server');
const MovieAPI = require('./datasources/movie');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const dataSources = () => ({
    movieAPI: new MovieAPI()
});

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    dataSources
});

server.listen().then(({ url }) => {
    console.log(`Server is ready at ${ url}`);
});