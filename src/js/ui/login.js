import { loginUser } from '../api/auth/login.js';

export async function onLogin(event) {
  event.preventDefault(); // Prevent default form submission

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const spinner = document.getElementById('loadingSpinner');
  if (spinner) spinner.style.display = 'block'; // Show spinner

  try {
    const result = await loginUser(data);
    // Store the JWT token and user data in localStorage
    localStorage.setItem('accessToken', result.data.accessToken);
    localStorage.setItem('user', JSON.stringify(result.data));

    alert('Login successful!');
    window.location.href = "/"; // Redirect to homepage
  } catch (error) {
    alert('Login failed: ' + error.message);
    console.error('Login Error:', error);
  } finally {
    if (spinner) spinner.style.display = 'none'; // Hide spinner
  }
}