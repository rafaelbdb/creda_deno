// AJAX function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const requestData = { email: email, password: password };
    const request = new XMLHttpRequest();
    request.open('POST', '/login');
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function() {
      if (request.status === 200) {
        const response = JSON.parse(request.responseText);
        if (response.success) {
          window.location.href = 'index.html';
        } else {
          alert(response.message);
        }
      } else {
        alert('An error occurred while processing your request.');
      }
    };
    request.send(JSON.stringify(requestData));
  }
  
  // Attach event listener to form submit event
  document.getElementById('login-form').addEventListener('submit', handleFormSubmission);
  