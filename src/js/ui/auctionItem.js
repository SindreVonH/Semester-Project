// auctionItems.js
import { fetchSingleItem } from '../api/auctions/auctionItem.js';
import { submitBid } from '../utilities/bid.js';

/**
 * Initialize the Bid Feature
 */
export const initializeBidFeature = () => {
  const bidForm = document.getElementById('bid-form');

  if (!bidForm) {
    console.error('Bid form not found.');
    return;
  }

  bidForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(bidForm);
    const amount = parseFloat(formData.get('bid-amount'));
    const auctionId = bidForm.dataset.auctionId; // Get auction ID from the form's data attribute

    if (!amount || amount <= 0) {
      alert('Please enter a valid bid amount.');
      return;
    }

    console.log('Submitting bid:', { auctionId, amount }); // Log the bid details

    try {
      await submitBid(auctionId, amount);
      await initializeSingleItemPage(); // Refresh the page to update details
    } catch (error) {
      console.error('Bid submission error:', error);
      alert('Failed to place bid. Please try again.');
    }
  });
};

/**
 * Render Item Details by Populating Existing DOM Elements
 */
const renderItemDetails = (item) => {
  // Populate Item Information
  const itemTitle = document.getElementById('item-title');
  const itemImage = document.getElementById('item-image');
  const itemDescription = document.getElementById('item-description');
  const itemTags = document.getElementById('item-tags');
  const itemStartDate = document.getElementById('item-start-date'); // Nytt element
  const itemEndsAt = document.getElementById('item-ends-at');
  const highestBid = document.getElementById('highest-bid');
  const bidCount = document.getElementById('bid-count');

  if (itemTitle) itemTitle.textContent = item.title || 'Auction Title';
  if (itemImage) {
    if (item.media?.length) {
      itemImage.src = item.media[0].url;
      itemImage.alt = item.media[0].alt || 'Auction Image';
    } else {
      itemImage.src = 'https://placehold.co/400';
      itemImage.alt = 'No image available';
    }
  }
  if (itemDescription)
    itemDescription.textContent =
      item.description || 'Auction description will appear here.';
  if (itemTags)
    itemTags.textContent =
      item.tags && item.tags.length ? item.tags.join(', ') : 'None';
  if (itemStartDate)
    itemStartDate.textContent = new Date(item.created).toLocaleString(); // Ny linje for startdato
  if (itemEndsAt)
    itemEndsAt.textContent = new Date(item.endsAt).toLocaleString();
  if (highestBid)
    highestBid.textContent = item.bids?.length
      ? `$${Math.max(...item.bids.map((bid) => bid.amount))}`
      : 'No bids yet';
  if (bidCount)
    bidCount.textContent = item._count?.bids
      ? item._count.bids
      : '0';

  // Set Auction ID in Bid Form
  const bidForm = document.getElementById('bid-form');
  if (bidForm) {
    bidForm.dataset.auctionId = item.id;
  }

// Populate Bidding History
const biddingHistory = document.querySelector('.card-body .list-group');
if (biddingHistory) {
  if (item.bids && item.bids.length) {
    // Sorter budene fra nyeste til eldste
    const sortedBids = item.bids.sort((a, b) => new Date(b.created) - new Date(a.created));

    // Generer HTML for sorterte bud
    biddingHistory.innerHTML = sortedBids
      .map(
        (bid) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span><strong>${bid.bidder?.name || 'Anonymous'}:</strong> $${bid.amount}</span>
          <small>${new Date(bid.created).toLocaleString()}</small>
        </li>`
      )
      .join('');
  } else {
    // Hvis ingen bud er tilgjengelige
    biddingHistory.innerHTML =
      '<li class="list-group-item text-muted">No bids yet.</li>';
  }
}

  // Populate Seller Information
  const sellerInfo = document.querySelector(
    '.card-header.bg-secondary + .card-body'
  );
  if (sellerInfo) {
    sellerInfo.innerHTML = `
      <p><strong>Name:</strong> ${item.seller?.name || 'Unknown'}</p>
      <p><strong>Email:</strong> ${item.seller?.email || 'Not provided'}</p>
    `;
  }
};

/**
 * Initialize Single Item Page
 */
export const initializeSingleItemPage = async () => {
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get('id');

  if (!itemId) {
    console.error('No item ID found in URL');
    return;
  }

  try {
    const item = await fetchSingleItem(itemId);
    console.log('Fetched item:', item.data); // Log the fetched item details
    renderItemDetails(item.data); // Populate the item details in the existing HTML
  } catch (error) {
    console.error('Error fetching item details:', error);
    alert('Failed to load item details. Please try again later.');
  }
};

/**
 * Initialize Auction Page
 */
export const initializeAuctionPage = () => {
  initializeSingleItemPage();
  initializeBidFeature();
};
