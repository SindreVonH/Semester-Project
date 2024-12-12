import { onRegister } from '../../ui/register.js';

export default function initializeRegisterView() {
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', onRegister);
  }
}

// Immediately invoke the initialization
initializeRegisterView();