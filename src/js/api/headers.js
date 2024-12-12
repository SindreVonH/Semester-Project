import { API_KEY } from "./constants.js"; // Import the API key

export const headers = () => {
  const token = localStorage.getItem('accessToken');

  return {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY, // Include the API key
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};