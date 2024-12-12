import { onLogin } from '../../ui/login.js';

export default function initializeLoginView() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', onLogin);
  }
}

// Immediately invoke the initialization
initializeLoginView();