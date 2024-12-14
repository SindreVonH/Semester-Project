import { API_AUTH_REGISTER } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Register a new user.
 * @param {Object} data - The registration data (name, email, password).
 * @returns {Promise<Object>} - The API response.
 */
export const registerUser = async (data) => {
  try {
    console.log('Register Request Data:', data); // Debugging the request payload

    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: headers(), // Include the API key and other headers
      body: JSON.stringify(data), // Convert data to JSON
    });

    const result = await response.json();
    console.log('Register API Response:', result); // Log the entire response

    if (!response.ok) {
      const errorMessage =
        result.errors && Array.isArray(result.errors)
          ? result.errors.map((err) => err.message).join(' ')
          : result.message || 'An error occurred during registration.';
      throw new Error(errorMessage);
    }

    return result;
  } catch (error) {
    console.error('Fetch Error:', error); // Log fetch errors
    throw error;
  }
};