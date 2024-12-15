import { getUserProfile } from '../api/profile/profile.js';
import { getUserListings } from '../api/profile/profileListings.js';
import { getUserBids } from '../api/utilities/profileCalls.js'; // Updated path
import { getUserWins } from '../api/profile/profileWins.js';
import { renderUserProfile } from '../utilities/renderProfile.js';
import { renderListings } from '../utilities/renderListings.js';
import { renderBids } from '../utilities/renderBids.js';
import { renderWins } from '../utilities/renderWins.js';
import { updateUserProfile } from '../utilities/updateProfile.js';


/**
 * Initialize Toggle Buttons for sections.
 */
export const initializeToggleButtons = () => {
  const buttons = document.querySelectorAll('[data-section]');
  const sections = document.querySelectorAll('.profile-section');

  if (!buttons || !sections) {
    console.error('Toggle buttons or sections not found');
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetSection = button.getAttribute('data-section');

      // Hide all sections
      sections.forEach((section) => section.classList.add('d-none'));

      // Show the selected section
      const activeSection = document.getElementById(targetSection);
      if (activeSection) activeSection.classList.remove('d-none');

      // Update active button styles
      buttons.forEach((btn) => btn.classList.remove('btn-dark'));
      button.classList.add('btn-dark'); // Highlight active button
    });
  });

  // Show default section (Your Listings)
  document.getElementById('user-auctions').classList.remove('d-none');
  buttons[0].classList.add('btn-dark');
};

/**
 * Initialize Edit Profile functionality.
 */
const initializeEditProfile = () => {
  const editButton = document.getElementById('edit-profile-btn');
  const editForm = document.getElementById('edit-profile-form');
  const profileDetails = document.getElementById('profile-details');

  if (!editButton || !editForm || !profileDetails) {
    console.error('Edit profile elements not found.');
    return;
  }

  // Toggle form visibility
  editButton.addEventListener('click', () => {
    const isHidden = editForm.classList.contains('d-none');
    editForm.classList.toggle('d-none', !isHidden);
    if (!isHidden) {
      editForm.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Form submission handler
  editForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const bio = document.getElementById('edit-bio').value.trim();
    const avatarUrl = document.getElementById('edit-avatar').value.trim();

    try {
      // Update profile
      await updateUserProfile({ bio, avatar: { url: avatarUrl } });

      // Refresh profile UI
      const profile = await getUserProfile();
      renderUserProfile(profileDetails, profile);

      alert('Profile updated successfully!');
      editForm.classList.add('d-none');
    } catch (error) {
      alert('Failed to update profile. Please try again later.');
    }
  });
};

/**
 * Initialize the Profile Page.
 */
export const initializeProfileUI = async () => {
  try {
    // Fetch and render user profile
    const profile = await getUserProfile();
    renderUserProfile(document.getElementById('profile-details'), profile);

    // Fetch and render user’s sections
    const listings = await getUserListings();
    renderListings(document.getElementById('user-auctions'), listings, 'listings');

    const bids = await getUserBids();
    renderBids(document.getElementById('user-bids'), bids);

    const wins = await getUserWins();
    renderWins(document.getElementById('user-wins'), wins);

    // Initialize toggle buttons and edit profile functionality
    initializeToggleButtons();
    initializeEditProfile();
  } catch (error) {
    alert('Failed to load profile, listings, bids, or wins. Please try again later.');
  }
};
