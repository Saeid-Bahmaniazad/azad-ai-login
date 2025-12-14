const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Replace this with your Google Sheet API endpoint or function
const SHEET_URL = 'https://script.google.com/macros/s/1R4vLcXshDeMUqDZHO1GUR16AYSSoak1zso0kBdw591w/exec';

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch(`${SHEET_URL}?action=checkLogin&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    const result = await response.json();

    if (result.success) {
      // Redirect to URL from Google Sheet column C
      window.location.href = result.redirectUrl;
    } else {
      errorMessage.innerHTML = `Email or Password is not valid.<br>For changing password or email contact <a href="mailto:admin@azadai.com.au">admin@azadai.com.au</a>`;
    }
  } catch (err) {
    console.error(err);
    errorMessage.innerHTML = 'Server error. Please try again later.';
  }
});
