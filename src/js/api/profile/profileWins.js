import { API_PROFILES } from '../constants.js';
import { headers } from '../headers.js';

/**
 * Fetch all wins by the user.
 * @returns {Promise<Array>} - An array of won listings.
 */
export const getUserWins = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const name = user?.name;

    if (!name) {
      throw new Error('User name not found in local storage.');
    }

    const url = `${API_PROFILES}/${name}/wins`;
    console.log('Fetching user wins from URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: headers(),
    });

    const result = await response.json();
    console.log('User Wins API Response:', result);

    if (!response.ok) {
      const errorMessage =
        result.errors && Array.isArray(result.errors)
          ? result.errors.map((err) => err.message).join(' ')
          : result.message || 'An error occurred while fetching user wins.';
      throw new Error(errorMessage);
    }

    return result.data; // Return the array of wins
  } catch (error) {
    console.error('Error fetching user wins:', error);
    throw error;
  }
};

