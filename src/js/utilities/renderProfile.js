export const renderUserProfile = (container, profile) => {
  if (!container) {
    console.error('Profile details container not found.');
    return;
  }

  const { name, bio, avatar, credits } = profile;

  container.innerHTML = `
    <div class="row g-4 align-items-center bg-white shadow-sm p-4 rounded-4">
      <!-- Avatar Section -->
      <div class="col-md-3 text-center">
        <img
          src="${avatar?.url || 'https://via.placeholder.com/150'}"
          alt="${avatar?.alt || 'User Avatar'}"
          id="user-avatar"
          class="img-fluid rounded-circle border border-3"
          style="border-color: #6366f1; width: 150px; height: 150px; object-fit: cover;"
        />
      </div>

      <!-- User Info Section -->
      <div class="col-md-6 text-center text-md-start">
        <h2 id="user-name" class="fw-bold mb-2" style="color: #1f2937;">${name || 'User Name'}</h2>
        <p id="user-bio" class="text-muted mb-2 fst-italic">${bio || 'No bio provided.'}</p>
        <p id="user-credits" class="fw-semibold fs-5 mb-0">
          Balance:
          <span style="color: #10b981;" class="fw-bold">$${credits || 0}</span>
        </p>
      </div>

      <!-- Edit Button Section -->
      <div class="col-md-3 d-flex justify-content-center justify-content-md-end">
        <button id="edit-profile-btn" class="btn px-4 py-2"
          style="background-color: #6366f1; color: white; border-radius: 999px;">
          <i class="bi bi-pencil-fill me-1"></i> Edit Profile
        </button>
      </div>
    </div>
  `;
};
