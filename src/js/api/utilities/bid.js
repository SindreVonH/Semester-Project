import { API_AUCTION_BID } from '../constants.js';
import { headers } from '../headers.js';

/**
 * Place a bid on an auction listing.
 * @param {string} id - The ID of the auction listing.
 * @param {number} amount - The bid amount.
 * @returns {Promise<Object>} - The API response.
 */
export const placeBid = async (id, amount) => {
  try {
    const response = await fetch(API_AUCTION_BID(id), {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ amount }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Bid API Error:', result);
      throw new Error(result.errors?.[0]?.message || 'Failed to place bid.');
    }
    return result.data;
  } catch (error) {
    console.error('Error placing bid:', error);
    throw error;
  }
};