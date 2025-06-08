const injectNavbar = () => {
  const header = document.querySelector('header');
  if (!header) {
    console.error('No <header> element found on this page.');
    return;
  }

  header.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-white shadow-sm fixed-top border-bottom">
      <div class="container">
        <!-- Logo -->
        <a href="/index.html" class="navbar-brand fw-bold" style="color: #6366f1;">
          <i class="bi bi-lightning-charge-fill me-1"></i> Actionhouse
        </a>

        <!-- Mobile Toggle -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Nav Items -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <div id="nav-buttons" class="ms-auto d-flex gap-2"></div>
        </div>
      </div>
    </nav>
  `;

  renderNavbar();
};

const renderNavbar = () => {
  const navButtons = document.getElementById('nav-buttons');
  if (!navButtons) {
    console.error('Navbar buttons container not found.');
    return;
  }

  navButtons.innerHTML = '';
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    // Logged in
    navButtons.innerHTML = `
      <a href="/pages/post/create/index.html" class="btn" style="background-color: #6366f1; color: white; border-radius: 999px;">
        <i class="bi bi-plus-circle me-1"></i> Add Listing
      </a>
      <a href="/pages/profile/index.html" class="btn btn-outline-dark rounded-pill">
        <i class="bi bi-person-fill me-1"></i> Profile
      </a>
      <button id="logout-button" class="btn btn-outline-danger rounded-pill">
        <i class="bi bi-box-arrow-right me-1"></i> Logout
      </button>
    `;

    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      window.location.href = '/index.html';
    });
  } else {
    // Logged out
    navButtons.innerHTML = `
      <a href="/pages/auth/register/index.html" class="btn btn-outline-dark rounded-pill">
        <i class="bi bi-person-plus me-1"></i> Register
      </a>
      <a href="/pages/auth/login/index.html" class="btn" style="background-color: #10b981; color: white; border-radius: 999px;">
        <i class="bi bi-box-arrow-in-right me-1"></i> Login
      </a>
    `;
  }
};

export const initializeNavbar = () => {
  injectNavbar();
};

document.addEventListener('DOMContentLoaded', () => {
  initializeNavbar();
});
