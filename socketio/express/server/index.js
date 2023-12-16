import express from 'express';
import { createServer } from 'node:http'
import { Server } from 'socket.io';

const PORT = process.env.PORT || 5500;

const app = express()
const expressServer = createServer(app)
const io = new Server(expressServer, {
    cors: {
        origin: '*'
    }
})

io.on('connection', socket => {
    socket.emit('message', `Welcome to Chat App, User ${socket.id.substring(0,5)} connected!`)
    socket.broadcast.emit('message', `User ${socket.id.substring(0,5)} connected!`)
    socket.on('error', console.error)

    socket.on('message', data => {
        console.log(data)
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('message', `User ${socket.id.substring(0,5)} disconnected!`)
    })

    socket.on('activity', (name) => {
        socket.broadcast.emit('activity', name)
    })

})

expressServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})