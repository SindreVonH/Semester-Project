import { API_AUCTIONS } from '../constants.js';
import { headers } from '../headers.js';

/**
 * Create a new auction listing.
 * @param {Object} listingData - The data for the new listing.
 * @returns {Promise<Object>} - The API response data.
 */
export const createListing = async (listingData) => {
  try {
    console.log('Create Listing Request Data:', listingData); // Log the request payload

    const response = await fetch(API_AUCTIONS, {
      method: 'POST',
      headers: headers(), // Include headers with API key and Authorization
      body: JSON.stringify(listingData), // Convert data to JSON
    });

    const result = await response.json();
    console.log('Create Listing API Response:', result); // Log the API response

    if (!response.ok) {
      const errorMessage =
        result.errors && Array.isArray(result.errors)
          ? result.errors.map((err) => err.message).join(' ')
          : result.message || 'An error occurred while creating the listing.';
      throw new Error(errorMessage);
    }

    return result; // Return the full response data
  } catch (error) {
    console.error('Error creating listing:', error); // Log errors
    throw error; // Re-throw the error for handling in the UI
  }
};