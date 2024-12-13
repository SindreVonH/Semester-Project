import { fetchAllListings } from '../api/auctions/auctionList.js';

/**
 * Render the auction listings.
 * @param {Array} listings - The array of auction listings.
 */

const renderListings = (listings) => {
  const container = document.getElementById('auction-listings');

  if (!container) {
    console.error('Auction listings container not found');
    return;
  }

  if (!Array.isArray(listings)) {
    console.error('Invalid listings data:', listings);
    container.innerHTML = '<p>Failed to load listings.</p>';
    return;
  }

  // Clear existing content
  container.innerHTML = '';

  // Render each listing
  listings.forEach((listing) => {
    const listingElement = document.createElement('div');
    listingElement.classList.add('listing');

    listingElement.innerHTML = `
      <a href="/pages/auctions/item/index.html?id=${listing.id}">
        ${
          listing.media && listing.media.length
            ? `<img src="${listing.media[0].url}" alt="${listing.media[0].alt || 'Auction Image'}" class="media">`
            : ''
        }
      </a>
      <h2 class="title">${listing.title}</h2>
      <p class="ends-at">Ends at: ${new Date(listing.endsAt).toLocaleString()}</p>
      <p class="description">${listing.description || 'No description provided'}</p>
      <p class="tags"><strong>Tags:</strong> ${listing.tags.join(', ') || 'None'}</p>
      <p class="bids"><strong>Bids:</strong> ${listing._count?.bids || 0}</p>
      <a href="/pages/auctions/item/index.html?id=${listing.id}" class="view-details">View Details</a>
    `;

    container.appendChild(listingElement);
  });
};


/**
 * Initialize the Auction Listing Page.
 */
export const initializeAuctionList = async () => {
  try {
    const listings = await fetchAllListings();
    renderListings(listings);
  } catch (error) {
    console.error('Error fetching auction listings:', error);
    alert('Failed to load auction listings. Please try again later.');
  }
};
