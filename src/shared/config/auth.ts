export const AuthConfig = {
  google: {
    // TODO: Move these to environment variables in production
    clientId: '244154342093-ck33g72tu04pgl0hlsq5i78vjcjvv30v.apps.googleusercontent.com',
    // Add your web client ID if different
    webClientId: '244154342093-ck33g72tu04pgl0hlsq5i78vjcjvv30v.apps.googleusercontent.com',
  },
  redirectUri: {
    scheme: 'self-development-app',
    web: 'http://localhost:19006',
  },
} as const; 