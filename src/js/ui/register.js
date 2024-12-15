import { registerUser } from '../api/auth/register.js';

/**
 * Handle registration form submission.
 * @param {Event} event - The form submission event.
 */
export async function onRegister(event) {
  event.preventDefault(); 

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries()); 
  const spinner = document.getElementById('loadingSpinner'); 
  if (spinner) spinner.style.display = 'block'; 

  try {
    const result = await registerUser(data); 
    console.log('Registration Successful:', result);
    alert('Registration successful! You can now log in.');
    window.location.href = "/pages/auth/login/index.html"; 
  } catch (error) {
    alert('Registration failed: ' + error.message);
    console.error('Registration Error:', error);
  } finally {
    if (spinner) spinner.style.display = 'none'; 
  }
}

// Attach the event listener to the form
document.getElementById('registerForm').addEventListener('submit', onRegister);