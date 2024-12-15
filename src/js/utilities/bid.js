import { placeBid } from '../api/utilities/bid.js';

/**
 * Check if the user is logged in.
 * @returns {boolean} True if logged in, false otherwise.
 */
function isLoggedIn() {
  return localStorage.getItem('accessToken') !== null;
}

/**
 * Submit a bid for an auction.
 * @param {string} id - The ID of the auction listing.
 * @param {number} amount - The bid amount.
 */
export const submitBid = async (id, amount) => {
  if (!isLoggedIn()) {
    alert('You need to log in to place a bid.');
    window.location.href = '/pages/auth/login/index.html'; // Redirect to login page
    return;
  }

  if (!id || amount <= 0) {
    alert('Invalid bid amount or auction ID.');
    return;
  }

  try {
    const result = await placeBid(id, amount);
    alert('Bid placed successfully!');
    return result;
  } catch (error) {
    alert('Failed to place bid. Please try again.');
  }
};