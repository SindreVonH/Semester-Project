import { API_PROFILES } from '../constants.js';
import { headers } from '../headers.js';

/**
 * Fetch the user's auction listings.
 * @returns {Promise<Array>} - An array of auction listings.
 */
export const getUserListings = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const name = user?.name;

    if (!name) {
      throw new Error('User name not found in local storage.');
    }

    const url = `${API_PROFILES}/${name}/listings`;

    const response = await fetch(url, {
      method: 'GET',
      headers: headers(),
    });

    const result = await response.json();
  
    if (!response.ok) {
      const errorMessage =
        result.errors && Array.isArray(result.errors)
          ? result.errors.map((err) => err.message).join(' ')
          : result.message || 'An error occurred while fetching user listings.';
      throw new Error(errorMessage);
    }

    return result.data; 
  } catch (error) {
    console.error('Error fetching user listings:', error);
    throw error;
  }
};