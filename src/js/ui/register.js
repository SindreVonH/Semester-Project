import { registerUser } from '../api/auth/register.js';

/**
 * Handle registration form submission.
 * @param {Event} event - The form submission event.
 */
export async function onRegister(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries()); // Convert FormData to a plain object

  console.log('Form Data to be sent:', data); // Debugging the form data

  const spinner = document.getElementById('loadingSpinner'); // Spinner element
  if (spinner) spinner.style.display = 'block'; // Show spinner

  try {
    const result = await registerUser(data); // Call API for registration
    console.log('Registration Successful:', result);
    alert('Registration successful! You can now log in.');
    window.location.href = "/pages/auth/login/index.html"; // Redirect to login page
  } catch (error) {
    alert('Registration failed: ' + error.message);
    console.error('Registration Error:', error);
  } finally {
    if (spinner) spinner.style.display = 'none'; // Hide spinner
  }
}

// Attach the event listener to the form
document.getElementById('registerForm').addEventListener('submit', onRegister);