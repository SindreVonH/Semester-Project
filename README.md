# Delisted - Auction Platform

Delisted is a modern, responsive auction platform built with **vanilla JavaScript**, **HTML**, and **Bootstrap 5**. It allows users to browse auction listings, place bids, create their own listings, and manage their profile—all connected to the Noroff Auction API.

## 🔗 Live Demo

[View live project](https://delisted.netlify.app/index.html)  
*(Replace with your actual deployment link)*

## 🛠️ Technologies Used

- HTML5
- CSS3 + Bootstrap 5
- JavaScript (ES Modules)
- Vite (Dev server & build tool)
- REST API (Noroff Auctions)

## ✅ Features

- **Home Page**
  - Browse all auction listings
  - Search auctions by keyword
  - Sort by ending soon or newest

- **Auction Item Page**
  - View full auction details
  - Place a bid (with validation)
  - See highest bid and full bidding history
  - View seller information

- **Create Listing**
  - Add a new auction with title, description, media, tags, and end date
  - Optional image upload

- **User Profile**
  - View and edit bio + avatar
  - See own listings, bids, and wins
  - Edit profile inline (no page reloads)

- **Authentication**
  - Register and log in
  - State persists using `localStorage`

- **Responsive Design**
  - Optimized layout for mobile, tablet, and desktop

## 📁 Folder Structure

project-root/
├── index.html # Homepage
├── pages/
│ ├── auctions/item/ # Single auction view
│ ├── post/create/ # Create listing
│ ├── profile/ # Profile page
│ └── auth/ # Login & register
├── src/
│ ├── js/
│ │ ├── api/ # API calls
│ │ ├── ui/ # UI logic per page
│ │ ├── router/views/ # Page routing logic
│ │ └── utilities/ # Helpers (e.g., bid logic)
└── public/ # Images, icons, etc.

bash
Kopier
Rediger

## 📦 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/delisted-auction.git
cd delisted-auction
Install dependencies (if using Vite):

bash
Kopier
Rediger
npm install
Run the project locally:

bash
Kopier
Rediger
npm run dev
Or open index.html directly in your browser (without Vite).

🔐 Authentication
Token is stored in localStorage

Authenticated users can create listings and place bids

Some API calls require Bearer token in headers

📄 API Reference
Endpoint: https://api.noroff.dev/api/v2/auction

Docs: Noroff Auction API

👤 Author
Made with by Sindre Marker
