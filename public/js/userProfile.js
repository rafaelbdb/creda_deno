// Define the necessary HTML elements
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const updateBtn = document.getElementById('update-btn');

// Define the function to update the user profile
function updateUserProfile() {
    // Get the input values from the HTML fields
    const name = nameField.value;
    const email = emailField.value;
    const password = passwordField.value;

    // Send a PUT request to the API with the updated user profile data
    fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        }),
    })
        .then((response) => {
            // If the request was successful, show a success message
            if (response.ok) {
                alert('User profile updated successfully!');
            }
            // Otherwise, show an error message
            else {
                alert('Error updating user profile.');
            }
        })
        .catch((error) => {
            // If there was an error with the request, show an error message
            alert('Error updating user profile.');
            console.error(error);
        });
}

// Add an event listener to the update button
updateBtn.addEventListener('click', updateUserProfile);
