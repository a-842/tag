document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request to server
    websocket.send(JSON.stringify({ type: 'login', username, password }));
});

const websocket = new WebSocket('ws://localhost:5000');

websocket.onopen = function() {
    console.log('WebSocket connection established.');
};

websocket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    // Handle incoming messages from server
    if (message.type === 'login_success') {
        console.log('Login successful.');
        // Redirect to dashboard or perform other actions
    } else if (message.type === 'login_failure') {
        console.error('Login failed.');
    }
};
