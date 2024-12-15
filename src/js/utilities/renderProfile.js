export const renderUserProfile = (container, profile) => {
  if (!container) {
    console.error('Profile details container not found.');
    return;
  }

  const { name, bio, avatar, credits } = profile;

  container.innerHTML = `
    <div class="row g-0 align-items-center py-4 px-3">
      <!-- Avatar Section -->
      <div class="col-md-3 d-flex justify-content-center align-items-center">
        <img
          src="${avatar?.url || 'https://via.placeholder.com/150'}"
          alt="${avatar?.alt || 'User Avatar'}"
          id="user-avatar"
          class="img-fluid rounded-circle border border-3 border-primary"
          style="width: 150px; height: 150px; object-fit: cover;"
        />
      </div>

      <!-- User Info Section -->
      <div class="col-md-6 text-center text-md-start">
        <h2 id="user-name" class="card-title fw-bold mb-2">${name || 'User Name'}</h2>
        <p id="user-bio" class="text-muted mb-2">${bio || 'No bio provided.'}</p>
        <p id="user-credits" class="fw-semibold fs-5">
          Balance: <span class="text-success fw-bold">$${credits || 0}</span>
        </p>
      </div>

      <!-- Edit Button Section -->
      <div class="col-md-3 d-flex justify-content-center justify-content-md-end align-items-center">
        <button id="edit-profile-btn" class="btn btn-danger px-4 py-2">Edit Profile</button>
      </div>
    </div>
  `;
};