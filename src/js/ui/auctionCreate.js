import { createAuction } from '../api/post/auctionCreate.js';

/**
 * Handles the form submission to create an auction.
 * @param {Event} event - The form submission event.
 */
export const handleCreateAuctionFormSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;

  // Bootstrap form validation
  if (!form.checkValidity()) {
    form.classList.add('was-validated'); // Bootstrap visuell validering
    return;
  }

  // Lag dataobjektet for API-kallet
  const data = {
    title: form.title.value.trim(),
    description: form.description.value.trim() || null,
    endsAt: new Date(form.endsAt.value).toISOString(),
    tags: form.tags.value.trim()
      ? form.tags.value.trim().split(',').map((tag) => tag.trim())
      : [],
    media: form.mediaUrl.value.trim()
      ? [{ url: form.mediaUrl.value.trim(), alt: form.mediaAlt.value.trim() || '' }]
      : [],
  };

  try {
    const result = await createAuction(data);
    alert('Auction successfully created!');
    console.log('API Response:', result);
    form.reset(); // Nullstill skjemaet
    form.classList.remove('was-validated'); // Fjern valideringsklasser
  } catch (error) {
    alert(`Failed to create auction: ${error.message}`);
  }
};

/**
 * Initialize the Create Auction UI
 * This function sets up the create auction page with form handling logic.
 */
export const initializeCreateAuctionUI = () => {
  const form = document.getElementById('create-listing-form'); // Oppdatert for å matche HTML
  if (form) {
    form.addEventListener('submit', handleCreateAuctionFormSubmit);
  } else {
    console.error('Create Auction form not found.');
  }
};