import { createServer } from 'node:http';
import { Server } from 'socket.io';


const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected!`)
    socket.on('error', console.error)

    socket.on('message', data => {
        console.log(data) 
        io.emit('message', `${socket.id.substring(0,5)}: ${data}`)
    })

})

httpServer.listen(5500, () => {
    console.log('Listening on port 5500')
})