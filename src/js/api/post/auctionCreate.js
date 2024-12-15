import { API_AUCTIONS } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Create a new auction listing by submitting the data to the API.
 * @param {Object} data - The auction data to submit.
 * @param {string} data.title - The title of the auction.
 * @param {string} [data.description] - The description of the auction.
 * @param {string} data.endsAt - The end date/time of the auction in ISO 8601 format.
 * @param {string[]} [data.tags] - Tags for the auction.
 * @param {Array<{url: string, alt: string}>} [data.media] - Media objects with URL and alt text.
 * @returns {Promise<Object>} - The response data from the API.
 */
export const createAuction = async (data) => {
  try {
    console.log('Submitting auction data:', data);

    const response = await fetch(API_AUCTIONS, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from API:', errorData);
      throw new Error(errorData.message || 'Failed to create auction');
    }

    const result = await response.json();
    console.log('Auction successfully created:', result);
    return result;
  } catch (error) {
    console.error('Error during auction creation:', error);
    throw error;
  }
};


