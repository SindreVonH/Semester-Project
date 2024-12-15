import { API_AUCTIONS } from '../constants.js';
import { headers } from '../headers.js';

/**
 * Search for listings.
 * @param {string} query - The search query.
 * @returns {Promise<Array>} - An array of matching listings.
 */
export const searchListings = async (query) => {
  try {
    const url = `${API_AUCTIONS}/search?q=${encodeURIComponent(query)}`;
  
    const response = await fetch(url, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMessage = error.message || 'Failed to fetch search results.';
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result.data; 
  } catch (error) {
    console.error('Search API Error:', error);
    throw error;
  }
};
