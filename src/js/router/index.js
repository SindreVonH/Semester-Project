function isLoggedIn() {
  return localStorage.getItem('accessToken') !== null;
}

export default async function router(pathname = window.location.pathname) {
  const publicPaths = [
    '/index.html',
    '/pages/auctions/item/index.html',
    '/pages/auth/login/index.html', 
    '/pages/auth/register/index.html', 
  ];

  const requiresAuth = !publicPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (requiresAuth && !isLoggedIn()) {
    
    window.location.href = '/pages/auth/login/index.html'; 
    return;
  }

  switch (true) {
    case pathname === '/index.html': // Homepage
      await import('./views/home.js');
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

    case pathname === '/pages/profile/index.html': // Profile page
      await import('./views/profile.js');
      break;

    case pathname === '/pages/post/create/index.html': // Create auction page
      await import('./views/auctionCreate.js');
      break;

    default: // 404 Error page
      await import('./views/errorFound.js');
  }
}