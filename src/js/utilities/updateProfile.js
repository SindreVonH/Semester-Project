import { updateProfile } from '../api/profile/updateProfile.js';

/**
 * Submit updated profile data.
 * @param {Object} data - The updated profile data (bio, avatar, banner, etc.).
 * @returns {Promise<void>}
 */
export const updateUserProfile = async (data) => {
  try {
    const updatedProfile = await updateProfile(data);
    console.log('Profile successfully updated:', updatedProfile);
  } catch (error) {
    throw error;
  }
};