import { fetchSingleItem } from '../api/auctions/auctionItem.js';

/**
 * Render item details.
 * @param {Object} item - The auction item data.
 */
const renderItemDetails = (item) => {
  const container = document.getElementById('item-details');

  if (!container) {
    console.error('Item details container not found');
    return;
  }

  // Find the highest bid
  const highestBid = item.bids?.length ? Math.max(...item.bids.map(bid => bid.amount)) : 'No bids yet';

  // Render the item details
  container.innerHTML = `
    <h2 class="text-lg font-bold">${item.title}</h2>
    <p class="text-sm text-gray-600">Ends at: ${new Date(item.endsAt).toLocaleString()}</p>
    <p class="text-gray-700">${item.description || 'No description provided'}</p>
    <p class="text-sm text-gray-500"><strong>Tags:</strong> ${item.tags.join(', ') || 'None'}</p>
    <p class="text-sm text-gray-500"><strong>Bids:</strong> ${item._count?.bids || 0}</p>
    <p class="text-sm text-gray-500"><strong>Highest Bid:</strong> ${highestBid}</p>
    ${
      item.media && item.media.length
        ? `<img src="${item.media[0].url}" alt="${item.media[0].alt || 'Auction Image'}" class="mt-4 w-full h-64 object-cover rounded">`
        : ''
    }
    <div class="mt-4">
      <h3 class="text-md font-semibold">Seller Information:</h3>
      <p><strong>Name:</strong> ${item.seller?.name || 'Unknown'}</p>
      <p><strong>Email:</strong> ${item.seller?.email || 'Not provided'}</p>
    </div>
    <div class="mt-4">
      <h3 class="text-md font-semibold">Bidding History:</h3>
      <ul class="bids-list">
        ${
          item.bids && item.bids.length
            ? item.bids
                .map(
                  (bid) =>
                    `<li><strong>${bid.bidderName}:</strong> $${bid.amount} at ${new Date(bid.created).toLocaleString()}</li>`
                )
                .join('')
            : '<li>No bids yet.</li>'
        }
      </ul>
    </div>
  `;
};

/**
 * Initialize the Single Item Page.
 */
const initializeSingleItemPage = async () => {
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get('id');

  if (!itemId) {
    console.error('No item ID found in URL');
    return;
  }

  try {
    const item = await fetchSingleItem(itemId);
    renderItemDetails(item.data); // Render the item details
  } catch (error) {
    console.error('Error fetching item details:', error);
    alert('Failed to load item details. Please try again later.');
  }
};

// Export as default
export default initializeSingleItemPage;
