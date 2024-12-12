import { API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../headers.js";

export const loginUser = async (data) => {
  const response = await fetch(API_AUTH_LOGIN, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'An error occurred during login.');
  }
  return result;
};