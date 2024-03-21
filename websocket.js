// Establish WebSocket connection
const websocket = new WebSocket('ws://localhost:5000');

// Handle WebSocket events
websocket.onopen = function() {
    console.log('WebSocket connection established.');
};

websocket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    // Handle incoming messages from the server
    console.log('Received message:', message);
    handleMessage(message);
};

websocket.onclose = function() {
    console.log('WebSocket connection closed.');
};

// Send messages to the server
function sendMessage(type, content) {
    const message = {
        type: type,
        content: content
    };
    websocket.send(JSON.stringify(message));
}

// Handle incoming messages and update UI
function handleMessage(message) {
    switch (message.type) {
        case 'chat_message':
            // Example: Update UI with chat message
            appendMessage(message.content);
            break;
        case 'error':
            // Example: Display error message to the user
            showError(message.error);
            break;
        // Handle other message types...
    }
}

// Example: Append a chat message to the chat window
function appendMessage(message) {
    const chatWindow = document.getElementById('chat-messages');
    chatWindow.innerHTML += `<div>${message}</div>`;
}

// Example: Display an error message to the user
function showError(error) {
    alert(`Error: ${error}`);
}
