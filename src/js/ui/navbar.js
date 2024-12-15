/**
 * Inject Navbar HTML into the page.
 */
const injectNavbar = () => {
  const header = document.querySelector('header');
  if (!header) {
    console.error('No <header> element found on this page.');
    return;
  }

  // Insert Navbar HTML
  header.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div class="container d-flex justify-content-between align-items-center">
        <!-- Logo -->
        <a href="/index.html" class="navbar-brand fw-bold text-primary">Delisted</a>
        
        <!-- Navbar Toggle for Mobile -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation Buttons -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <div id="nav-buttons" class="ms-auto d-flex gap-2"></div>
        </div>
      </div>
    </nav>
  `;

  // Render navbar buttons dynamically based on login state
  renderNavbar();
};

/**
 * Render Navbar Buttons based on login state.
 */
const renderNavbar = () => {
  const navButtons = document.getElementById('nav-buttons');
  if (!navButtons) {
    console.error('Navbar buttons container not found.');
    return;
  }

  // Clear existing buttons
  navButtons.innerHTML = '';

  // Check user login state
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    // Logged in
    navButtons.innerHTML = `
      <a href="/pages/post/create/index.html" class="btn btn-danger">Add Listing</a>
      <a href="/pages/profile/index.html" class="btn btn-danger">Profile</a>
      <button id="logout-button" class="btn btn-outline-danger">Logout</button>
    `;

    // Logout functionality
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      window.location.href = '/index.html'; // Redirect to homepage after logout
    });
  } else {
    // Logged out
    navButtons.innerHTML = `
      <a href="/pages/auth/register/index.html" class="btn btn-outline-primary">Register</a>
      <a href="/pages/auth/login/index.html" class="btn btn-primary">Login</a>
    `;
  }
};

/**
 * Initialize Navbar
 */
export const initializeNavbar = () => {
  injectNavbar();
};

// Immediately inject the navbar on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeNavbar();
});
