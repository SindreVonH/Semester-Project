import { updateProfile } from '../api/profile/updateProfile.js';

/**
 * Submit updated profile data.
 * @param {Object} data - The updated profile data (bio, avatar, banner, etc.).
 * @returns {Promise<void>}
 */
export const updateUserProfile = async (data) => {
  try {
    console.log('Updating profile with data:', data);
    const updatedProfile = await updateProfile(data);
    console.log('Profile successfully updated:', updatedProfile);
  } catch (error) {
    console.error('Error submitting profile update:', error);
    throw error;
  }
};