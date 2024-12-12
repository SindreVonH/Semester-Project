import { registerUser } from '../api/auth/register.js';

export async function onRegister(event) {
  event.preventDefault(); // Prevent default form submission

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const spinner = document.getElementById('loadingSpinner');
  if (spinner) spinner.style.display = 'block'; // Show spinner

  try {
    const result = await registerUser(data);

    alert('Registration successful! You can now log in.');
    window.location.href = "/auth/login"; // Redirect to login page
  } catch (error) {
    alert('Registration failed: ' + error.message);
    console.error('Registration Error:', error);
  } finally {
    if (spinner) spinner.style.display = 'none'; // Hide spinner
  }
}