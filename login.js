document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    var formData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    // Send a POST request with JSON data
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Handle the response here, e.g., show a message to the user
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
