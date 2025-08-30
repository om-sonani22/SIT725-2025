// Connect to the Socket.IO server
const socket = io();

// Listen for 'number' event sent from the server
socket.on('number', (msg) => {
    console.log('Random number:', msg);
    document.getElementById('number').innerText = msg;
});
