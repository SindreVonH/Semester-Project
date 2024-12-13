import { createListing } from '../api/post/auctionCreate.js';

/**
 * Handle the create listing form submission.
 * @param {Event} event - The form submit event.
 */
export async function handleCreateListing(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const form = event.target;
  const formData = new FormData(form);

  // Collect data from the form
  const data = {
    title: formData.get('title'),
    description: formData.get('description') || null,
    tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
    media: formData.get('media') ? [{ url: formData.get('media'), alt: '' }] : [],
    endsAt: formData.get('endsAt'),
  };

  try {
    // Call the API to create the listing
    const result = await createListing(data);
    alert('Auction created successfully!');

    // Redirect to the auctions page
    window.location.href = '/pages/auctions/index.html';
  } catch (error) {
    console.error('Error creating auction:', error);
    alert(`Failed to create listing: ${error.message}`);
  }
}