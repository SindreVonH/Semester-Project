import { getUserProfile } from '../api/profile/profile.js';
import { getUserListings } from '../api/profile/profileListings.js';

/**
 * Render the user's profile data.
 * @param {Object} profile - The user's profile data.
 */
const renderUserProfile = (profile) => {
  const container = document.getElementById('profile-details');

  if (!container) {
    console.error('Profile details container not found.');
    return;
  }

  const { name, bio, avatar, banner, credits } = profile;

  container.innerHTML = `
    <Section>
      <img src="${avatar?.url || ''}" alt="${avatar?.alt || 'Avatar'}" />
      <h2>${name}</h2>
      <p>${bio || 'No bio provided.'}</p>
      <p>Credits: ${credits || 0}</p>
    </Section>
  `;
};

/**
 * Render the user's auction listings.
 * @param {Array} listings - The user's auction listings.
 */
const renderUserListings = (listings) => {
  const container = document.getElementById('user-auctions');

  if (!container) {
    console.error('User auctions container not found.');
    return;
  }

  if (!Array.isArray(listings) || listings.length === 0) {
    container.innerHTML = '<p>No auctions found.</p>';
    return;
  }

  // Clear existing content
  container.innerHTML = '';

  // Render each listing as a simple structure
  listings.forEach((listing) => {
    const card = document.createElement('card');

    card.innerHTML = `
      <h3>${listing.title}</h3>
      <p>Ends at: ${new Date(listing.endsAt).toLocaleString()}</p>
      <p>${listing.description || 'No description provided'}</p>
      ${
        listing.media && listing.media.length
          ? `<img src="${listing.media[0].url}" alt="${listing.media[0].alt || 'Auction Image'}" />`
          : ''
      }
      <p>Tags: ${listing.tags.join(', ') || 'None'}</p>
      <p>Bids: ${listing._count.bids || 0}</p>
      <a href="/pages/auctions/item/${listing.id}/index.html">View Details</a>
    `;

    container.appendChild(card);
  });
};

/**
 * Initialize the Profile Page with Profile and Listings.
 */
export const initializeProfileUI = async () => {
  try {
    // Fetch and render user profile
    const profile = await getUserProfile();
    renderUserProfile(profile);

    // Fetch and render user's listings
    const listings = await getUserListings();
    renderUserListings(listings);
  } catch (error) {
    alert('Failed to load profile or listings. Please try again later.');
    console.error('Error initializing profile page:', error);
  }
};