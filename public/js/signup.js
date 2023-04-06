const signupBtn = document.getElementById('signup-btn');
signupBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
      alert('User successfully registered!');
      window.location.href = '/login.html';
    } else {
      alert('Failed to register user.');
    }
  } catch (error) {
    console.error(error);
  }
});
