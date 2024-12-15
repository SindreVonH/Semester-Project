export const renderListings = (container, listings, type) => {
  if (!container) {
    console.error(`${type} container not found.`);
    return;
  }

  if (!Array.isArray(listings) || listings.length === 0) {
    container.innerHTML = `<p class="text-center text-muted">No ${type} found.</p>`;
    return;
  }

  container.innerHTML = ''; // Clear existing content

  listings.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4 d-flex'; // Responsive grid columns with equal height cards

    card.innerHTML = `
      <div class="card shadow-sm w-100">
        <!-- Image Section -->
        ${
          item.media?.length
            ? `<img src="${item.media[0].url}" alt="${
                item.media[0].alt || 'Auction Image'
              }" class="card-img-top object-fit-cover" style="height: 200px;" />`
            : `<div class="card-img-top bg-secondary d-flex align-items-center justify-content-center text-white" style="height: 200px;">
                 No Image
               </div>`
        }
        
        <!-- Card Body -->
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-truncate">${item.title || 'No Title'}</h5>
          <p class="card-text text-muted mb-2">
            Ends At: ${new Date(item.endsAt).toLocaleString()}
          </p>
          <p class="card-text text-truncate small">${item.description || 'No description available.'}</p>
          
          <!-- View Details Button -->
          <div class="mt-auto">
            <a href="/pages/auctions/item/index.html?id=${item.id}" class="btn btn-primary w-100">
              View Details
            </a>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
};
