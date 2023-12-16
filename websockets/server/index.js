import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: '5500' })

server.on('connection', socket => {

    socket.on('error', console.error)

    socket.on('message', message => {
        const b = Buffer.from(message)
        console.log(b.toString())
        socket.send(`${message}`)
    })

    socket.send('something')
})