import { API_AUTH_REGISTER } from "../constants.js";
import { headers } from "../headers.js";

export const registerUser = async (data) => {
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log('Register API Response:', result); // Log the entire response

    if (!response.ok) {
      // Check if 'errors' field exists for detailed messages
      let errorMessage = result.message;
      if (result.errors && Array.isArray(result.errors)) {
        errorMessage = result.errors.map(err => err.msg).join(' ');
      }
      throw new Error(errorMessage || 'An error occurred during registration.');
    }
    return result;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error; // Rethrow the error to be caught in the UI script
  }
};