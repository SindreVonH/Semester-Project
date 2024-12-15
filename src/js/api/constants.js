export const API_KEY = "2d6199c7-375b-4ac7-9782-8ddc84b45db0";
export const API_BASE = "https://v2.api.noroff.dev";

// Auth Endpoints
export const API_AUTH = `${API_BASE}/auth`;
export const API_AUTH_LOGIN = `${API_AUTH}/login`;
export const API_AUTH_REGISTER = `${API_AUTH}/register`;

// Auction Endpoints
export const API_AUCTIONS = `${API_BASE}/auction/listings`; // Create and fetch listings
export const API_AUCTION_BID = (id) => `${API_AUCTIONS}/${id}/bids`;

// Profile Endpoints
export const API_PROFILES = `${API_BASE}/auction/profiles`; // Fetch and manage user profiles
