const http = require('http')
const { schema } = require('./schema')
const { createContext } = require('./context')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const socketio = require('socket.io')

const app = express()
let server = http.createServer(app)
let io = socketio(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
})
const appoloserver = new ApolloServer({ schema, context: createContext })

appoloserver.applyMiddleware({
    app,
    path: '/'
})

io.on('connection', () => {
    console.log('user connected!')
})

server.listen(4000,
    () => { console.log(`🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql-apollo-server#using-the-graphql-api`) }
)