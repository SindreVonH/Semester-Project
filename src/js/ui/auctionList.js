import { fetchAllListings } from '../api/auctions/auctionList.js';
import { searchListings } from '../api/auctions/searchListings.js';

/**
 * Render auction listings with Bootstrap card layout.
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
    container.innerHTML = '<p class="text-danger">Failed to load listings.</p>';
    return;
  }

  container.innerHTML = ''; // Clear existing content

  listings.forEach((listing) => {
    const card = document.createElement('div');
    card.classList.add('col-md-6', 'col-lg-3'); // Responsive grid columns

    // Bestem bilde-URL: Bruk første media-URL eller placeholder
    const imageUrl = listing.media?.length ? listing.media[0].url : 'https://placehold.co/400';
    const imageAlt = listing.media?.length ? listing.media[0].alt || 'Auction Image' : 'Placeholder Image';

    card.innerHTML = `
      <div class="card shadow-sm h-100">
        <!-- Image Section -->
        <a href="/pages/auctions/item/index.html?id=${listing.id}" class="text-decoration-none">
          <img src="${imageUrl}" class="card-img-top img-fixed" alt="${imageAlt}" />
        </a>
        <!-- Card Body -->
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-truncate">${listing.title}</h5>
          <p class="card-text small text-muted mb-2">Ends at: ${new Date(listing.endsAt).toLocaleString()}</p>
          <p class="card-text small text-muted mb-2">Created: ${new Date(listing.created).toLocaleString()}</p>
          <p class="card-text small text-truncate">${listing.description || 'No description provided'}</p>
          <p class="card-text small"><strong>Tags:</strong> ${listing.tags.join(', ') || 'None'}</p>
          <p class="card-text small"><strong>Bids:</strong> ${listing._count?.bids || 0}</p>
          <!-- View Details Button -->
          <div class="mt-auto">
            <a href="/pages/auctions/item/index.html?id=${listing.id}" class="btn btn-primary btn-sm w-100">View Details</a>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
};
/**
 * Initialize the Auction Listings Page.
 */
let isOldestFirst = false; // Start med nyest først

export const initializeAuctionList = async () => {
  let defaultListings = [];
  const container = document.getElementById('auction-listings'); // Hent containeren her

  try {
    // Fetch the listings
    defaultListings = await fetchAllListings(true);
    renderListings(defaultListings);

    // Sorting Buttons
    const sortByEndTimeButton = document.getElementById('sort-by-end-time');
    const sortByCreationTimeButton = document.getElementById('sort-by-creation-time');

    sortByEndTimeButton.addEventListener('click', () => {
      const sorted = [...defaultListings].sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
      renderListings(sorted);
    });

    sortByCreationTimeButton.addEventListener('click', () => {
      const sorted = [...defaultListings].sort((a, b) => {
        return isOldestFirst
          ? new Date(a.created) - new Date(b.created) // Eldst først
          : new Date(b.created) - new Date(a.created); // Nyest først
      });
    
      // Toggle rekkefølge for neste klikk
      isOldestFirst = !isOldestFirst;
    
      // Oppdater listen
      renderListings(sorted);
    
      // Oppdater knappens tekst for å indikere gjeldende rekkefølge (valgfritt)
      sortByCreationTimeButton.textContent = isOldestFirst
        ? 'Sort by Newest'
        : 'Sort by Oldest';
    });

    // Search Functionality
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const query = document.getElementById('search-input').value.trim();

      if (!query) {
        renderListings(defaultListings);
        return;
      }

      container.innerHTML = '<p class="text-center">Searching...</p>';
      try {
        const results = await searchListings(query);
        if (!results || results.length === 0) {
          container.innerHTML = '<p class="text-center text-danger">No results found.</p>';
        } else {
          renderListings(results);
        }
      } catch (error) {
        container.innerHTML = `<p class="text-center text-danger">Error: ${error.message}</p>`;
      }
    });
  } catch (error) {
    alert('Failed to load auction listings.');
  }
};




