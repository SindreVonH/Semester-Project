import { API_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Fetch the user's profile data.
 * @returns {Promise<Object>} - The user's profile data.
 */
export const getUserProfile = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const name = user?.name;

    if (!name) {
      throw new Error('User name not found in local storage.');
    }

    const url = `${API_PROFILES}/${name}`;
    console.log('Fetching profile from URL:', url); // Debugging the request URL

    const response = await fetch(url, {
      method: 'GET',
      headers: headers(),
    });

    const result = await response.json();
    console.log('Profile API Response:', result); // Log the API response

    if (!response.ok) {
      const errorMessage =
        result.errors && Array.isArray(result.errors)
          ? result.errors.map((err) => err.message).join(' ')
          : result.message || 'An error occurred while fetching the profile.';
      throw new Error(errorMessage);
    }

    return result.data; // Return the profile data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; // Re-throw the error for handling in the UI
  }
};