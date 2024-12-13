import { API_AUCTIONS } from '../constants.js';

/**
 * Fetch all auction listings.
 * @returns {Promise<Array>} - The array of auction listings.
 */
export const fetchAllListings = async () => {
  const response = await fetch(API_AUCTIONS);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch listings');
  }

  const data = await response.json();
  console.log('API Response:', data); // Debugging
  return data.data; // Return the `data` property containing the array of listings
};
