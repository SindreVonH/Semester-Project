import { API_PROFILES } from '../constants.js';
import { headers } from '../headers.js';

/**
 * Update the user's profile.
 * @param {Object} data - The updated profile data.
 * @returns {Promise<Object>} - The updated profile.
 */
export const updateProfile = async (data) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const name = user?.name;

    if (!name) {
      throw new Error('User name not found in local storage.');
    }

    const response = await fetch(`${API_PROFILES}/${name}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
