const { schema } = require('./schema')
const { createContext } = require('./context')

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true // <-- REQUIRED backend setting
};

const server = new ApolloServer({ schema, context: createContext })

app.use(cors(corsOptions));
app.use(cookieParser());

app.use((req, res, next) => { // checks for user in cookies and adds userId to the requests
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.USER_SECRET);
    req.userId = userId;
  }
  next();
})

server.applyMiddleware({
  app,
  path: '/',
  cors: false, // disables the apollo-server-express cors to allow the cors middleware use
})

app.listen(
  { port: 4000 },
  () =>
    console.log(
      `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql-apollo-server#using-the-graphql-api`,
    ),
)
