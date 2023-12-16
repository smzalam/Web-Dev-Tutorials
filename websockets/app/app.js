const socket = new WebSocket('ws://localhost:5500')

// function to get the value of the message sent by user
function sendMessage(e) {
    e.preventDefault()
     const input = document.querySelector('input')
    if (input.value) {
        socket.send(input.value)
        input.value = ''
    }
    input.focus()
}

// event listener for form to carry out when button has been clicked
document.querySelector('form')
    .addEventListener('submit', sendMessage)

// adding message to list when message event is carried out
socket.addEventListener('message', ({ data }) => {
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})