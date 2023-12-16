const socket = io()

socket.on("connect", () => {
    console.log(socket.connected); // true
  });

// function to get the value of the message sent by user
// https://kissasian.cz/drama/the-matchmakers-2023-episode-1
function sendMessage(e) {
    e.preventDefault()
     const input = document.querySelector('input')
    if (input.value) {
        console.log(input.value)
        socket.emit('message', input.value)
        input.value = ''
    }
    input.focus()
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