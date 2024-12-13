export default async function router(pathname = window.location.pathname) {
  switch (true) {
    case pathname === '/': // Homepage
      await import('./views/home.js');
      break;

    case pathname === '/pages/auctions/index.html': // Auction listing page
      await import('./views/auctionList.js');
      break;

      case /^\/pages\/auctions\/item\/index\.html/.test(pathname): // Individual auction page
      await import('./views/auctionItem.js');
      break;

    case pathname === '/pages/auth/login/index.html': // Login page
      await import('./views/login.js');
      break;

    case pathname === '/pages/auth/register/index.html': // Register page
      await import('./views/register.js');
      break;

    case pathname === '/profile': // Profile page
      await import('./views/profile.js');
      break;

    case pathname === '/post/create': // Create auction page
      await import('./views/auctionCreate.js');
      break;

    case /^\/post\/edit\/\d+$/.test(pathname): // Edit auction page
      await import('./views/auctionEdit.js');
      break;

    default: // 404 Error page
      await import('./views/errorFound.js');
  }
}