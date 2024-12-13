import { API_AUCTIONS } from '../constants.js';
import { headers } from '../headers.js';

/**
 * Create a new auction listing.
 * @param {Object} listingData - The data for the new listing.
 * @returns {Promise<Response>} - The API response.
 */
export const createListing = async (listingData) => {
  const response = await fetch(API_AUCTIONS, {
    method: 'POST',
    headers: headers(), // Includes x-api-key and Authorization token if available
    body: JSON.stringify(listingData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create listing');
  }

  return response.json(); // Return the parsed response data
};