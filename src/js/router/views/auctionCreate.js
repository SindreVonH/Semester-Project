import { handleCreateListing } from '../../ui/auctionCreate.js';

/**
 * Initialize the Auction Create Page View.
 */
export default function initializeAuctionCreateView() {
  const createListingForm = document.getElementById('create-listing-form');
  if (createListingForm) {
    createListingForm.addEventListener('submit', handleCreateListing);
  }
}

// Immediately invoke the initialization
initializeAuctionCreateView();