const socket = io('http://localhost:5500')

socket.on("connect", () => {
    console.log(socket.connected); // true
  });

const activity = document.querySelector('.activity')
const msgInput = document.querySelector('input')

// function to get the value of the message sent by user
// https://kissasian.cz/drama/the-matchmakers-2023-episode-1
function sendMessage(e) {
    e.preventDefault()
    if (msgInput.value) {
        console.log(msgInput.value)
        socket.emit('message', msgInput.value)
        msgInput.value = ''
    }
    msgInput.focus()
}

// event listener for form to carry out when button has been clicked
document.querySelector('form')
    .addEventListener('submit', sendMessage)

// adding message to list when message event is carried out
socket.on('message', (data) => {
    console.log(data)
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})

msgInput.addEventListener('keypress', () => {
    socket.emit('activity', socket.id.substring(0,5))
})

let activityTimer
socket.on('activity', name => {
    activity.textContent = `${name} is typing...`
    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.textContent = ""
    }, 3000)
})