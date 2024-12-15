export const renderBids = (container, bids) => {
  if (!container) {
    console.error('User bids container not found.');
    return;
  }

  if (!Array.isArray(bids) || bids.length === 0) {
    container.innerHTML = `
      <p class="text-center text-muted">No bids found.</p>
    `;
    return;
  }

  container.innerHTML = ''; // Clear existing content

  bids.forEach((bid) => {
    const listing = bid.listing || {};

    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4 d-flex'; // Responsive grid layout

    card.innerHTML = `
      <div class="card shadow-sm w-100">
        <!-- Image Section -->
        ${
          listing.media?.length
            ? `<img src="${listing.media[0].url}" alt="${listing.media[0].alt || 'Auction Image'}" 
                class="card-img-top object-fit-cover" style="height: 200px;" />`
            : `<div class="card-img-top bg-secondary d-flex align-items-center justify-content-center text-white" style="height: 200px;">
                No Image
              </div>`
        }

        <!-- Card Body -->
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-truncate">${listing.title || 'No Title'}</h5>
          <p class="card-text text-muted small">Bid Amount: <strong>$${bid.amount || '0'}</strong></p>
          <p class="card-text text-muted small">Ends At: ${new Date(listing.endsAt).toLocaleString()}</p>
          
          <!-- View Details Button -->
          <div class="mt-auto">
            <a href="/pages/auctions/item/index.html?id=${listing.id}" 
               class="btn btn-primary btn-sm w-100">
              View Listing
            </a>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
};