import { API_AUCTIONS } from '../constants.js';
import { headers } from '../headers.js';

/**
 * Fetch auction listings with optional filtering for active listings.
 * @param {boolean} isActive - If true, fetch only active listings.
 * @returns {Promise<Array>} - The array of auction listings.
 */
export const fetchAllListings = async (isActive = false) => {
  try {
    const url = isActive ? `${API_AUCTIONS}?_active=true` : API_AUCTIONS;
    const response = await fetch(url, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch listings.');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};
