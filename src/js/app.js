import initializeRouter from './router/index.js';

// Initialize the router on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeRouter(window.location.pathname);
});

console.log('App.js is working!');