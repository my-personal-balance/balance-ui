// This file will not end up inside the main application JavaScript bundle.
// Instead, it will simply be copied inside the build folder.
// The generated "index.html" will require it just before this main bundle.
// You can thus use it to define some environment variables that will
// be made available synchronously in all your JS modules under "src".
//
// Warning: this file will not be transpiled by Babel and cannot contain
// any syntax that is not yet supported by your targeted browsers.

// during development we don't load the config via the browser, so we import it
// this means we'll end up importing it twice during production. the second time
// we'd overwrite it, if we didn't check whether window.env is already defined.
if (typeof window.env === 'undefined') {
  window.env = {
    // This option can be retrieved in "src/index.js" with "window.env.API_URL".
    REACT_APP_REDIRECT_URI: 'http://localhost:3000/auth/complete/',
    REACT_APP_API_BASE_URL: 'http://localhost:5000',
    REACT_APP_ENVIRONMENT: 'local',
  };
}