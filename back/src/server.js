const http = require('http')
const { schema } = require('./schema')
const { createContext } = require('./context')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const socketio = require('socket.io')

const app = express()
let server = http.createServer(app)
let io = socketio.listen(server, {
    log: false,
    agent: false,
    origins: 'https://mabite.com',
    transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
})
const appoloserver = new ApolloServer({ schema, context: createContext })

appoloserver.applyMiddleware({
    app,
    path: '/',
    cors: false
})

io.on('connection', () => {
    console.log('user connected!')
})

server.listen(4000,
    () => { console.log(`🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql-apollo-server#using-the-graphql-api`) }
)
