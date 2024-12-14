import { initializeProfileUI } from '../../ui/profile.js';

/**
 * Initialize the Profile View
 * This function sets up the profile page with user information and listings.
 */
export default function initializeProfileView() {
  initializeProfileUI(); // Fetch and render both user profile and listings
}

// Immediately invoke the initialization
initializeProfileView();