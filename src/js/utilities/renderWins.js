export const renderWins = (container, wins) => {
  if (!container) {
    console.error('User wins container not found.');
    return;
  }

  if (!Array.isArray(wins) || wins.length === 0) {
    container.innerHTML = `
      <p class="text-center text-muted">No wins found.</p>
    `;
    return;
  }

  container.innerHTML = ''; // Clear existing content

  wins.forEach((win) => {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4 d-flex'; // Responsive grid layout

    card.innerHTML = `
      <div class="card shadow-sm w-100">
        <!-- Image Section -->
        ${
          win.media?.length
            ? `<img src="${win.media[0].url}" alt="${win.media[0].alt || 'Auction Image'}" 
                class="card-img-top object-fit-cover" style="height: 200px;" />`
            : `<div class="card-img-top bg-secondary d-flex align-items-center justify-content-center text-white" style="height: 200px;">
                No Image
              </div>`
        }

        <!-- Card Body -->
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-truncate">${win.title || 'No Title'}</h5>
          <p class="card-text text-muted small">Ends At: ${new Date(win.endsAt).toLocaleString()}</p>
          
          <!-- View Listing Button -->
          <div class="mt-auto">
            <a href="/pages/auctions/item/index.html?id=${win.id}" 
               class="btn btn-success btn-sm w-100">
              View Listing
            </a>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
};