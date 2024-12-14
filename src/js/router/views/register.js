import { onRegister } from '../../ui/register.js';

/**
 * Initialize the Register Page.
 */
export default function initializeRegisterView() {
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', onRegister); // Attach the form submission handler
  }
}

// Immediately invoke the initialization
initializeRegisterView();