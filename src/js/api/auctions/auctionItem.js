import { API_AUCTIONS } from '../constants.js';

/**
 * Fetch a single auction listing by ID, including optional data.
 * @param {string} id - The ID of the auction.
 * @returns {Promise<Object>} - The auction data.
 */
export const fetchSingleItem = async (id) => {
  const response = await fetch(`${API_AUCTIONS}/${id}?_seller=true&_bids=true`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch item');
  }

  return response.json(); 
};