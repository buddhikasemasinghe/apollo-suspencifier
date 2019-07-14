# React Suspense with Appllo
 
A learning guide to experiment React Suspense features with GraphQL server. This is my first hands on experience in GraphQL.

## :pray:
This project is inspired by Dan Abramov's talk in [React Fest](https://www.youtube.com/watch?v=6g3g0Q_XVb4) and Jared Palmer's talk in [React Europe 2019](https://www.youtube.com/watch?v=8mnaI8BpsmE). I have used some patterns/concepts that they have used in this example.

## :cd:
### React Client

`cd apollo-client`
`yarn`

>Since I have used some experimental features of React you need to build react master and do `yarn link` some packages in order to get this application work.

>`git clone https://github.com/facebook/react.git`
`yarn build`
> * And perform yarn link in following packages react, react-dom, react-cache
`cd build/packages/react`
`yarn link`

> * Then 
> `cd apollo-client`
> `yarn link react react-dom react-cache`





#### 


### Node/Express Server
`cd apollo-server`

> You need to create an account in [The moview database](https://developers.themoviedb.org) then copy API keu
> * `move .env.template .env`
> * replace MOVIE_DB_API key

`npm i`

 

## Run
 #### Run server
 ` cd apollo-server` 
 `npm start`
#### Run client
`cd apollo-client`
`yarn start`

 ## Testing
 Todo
