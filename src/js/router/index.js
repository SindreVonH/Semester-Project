export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/':
      await import('./views/auth.js');
      break;
    case '/auth/login/':
      await import('./views/login.js');
      break;
    case '/auth/register/':
      await import('./views/register.js');
      break;
    case '/post/create/':
      await import('./views/postCreate.js');
      break;
    case '/post/edit/':
      await import('./views/postEdit.js');
      break;
    case '/profile/':
      await import('./views/profile.js');
      break;
    default:
      await import('./views/errorFound.js');
  }
}
