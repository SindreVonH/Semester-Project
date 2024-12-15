import { initializeAuctionList } from '../../ui/auctionList.js';

/**
 * Initialize the Auction List View.
 */
export default function initializeAuctionListView() {
  // Initialize the auction list, which now includes search functionality
  initializeAuctionList();
}

// Immediately invoke the initialization
initializeAuctionListView();