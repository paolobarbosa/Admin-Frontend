export const msalConfig = {
    auth: {
      clientId: process.env.REACT_APP_MSAL_CLIENT_ID, 
      authority: process.env.REACT_APP_MSAL_AUTHORITY, 
      knownAuthorities: [process.env.REACT_APP_MSAL_KNOWN_AUTHORITIES], 
      redirectUri: process.env.REACT_APP_MSAL_REDIRECT_URI, 
      postLogoutRedirectUri: '/', 
      navigateToLoginRequestUrl: false, 
    },
    cache: {
      cacheLocation: 'sessionStorage', 
      storeAuthStateInCookie: false, 
    }
  }

  export const protectedApi = {

    api: {

      endpoint: process.env.REACT_APP_API_ENDPOINT,

      scopes: {

        read: ["https://audionex.onmicrosoft.com/3733088a-2301-4dbe-aab6-a8459b37c96b/Task.Read"],

        write: ["https://audionex.onmicrosoft.com/3733088a-2301-4dbe-aab6-a8459b37c96b/Task.Write"],

      },

    },

  };

  export const loginRequest = {
    scopes: [...protectedApi.api.scopes.read, ...protectedApi.api.scopes.write],
  };