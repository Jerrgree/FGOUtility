import { AuthenticationContext } from 'react-adal';
const adalConfig = {
    tenant: 'jeremyrgreenburggmail.onmicrosoft.com',
    clientId: 'eac4f5ac-6f55-4c6e-b230-90baf099e2e5',
    endpoints: {
        api: 'https://login.microsoftonline.com/03185098-fdfb-43f7-badc-3b050b831a79'
    },
    postLogoutRedirectUri: window.location.origin,
    redirectUri: 'https://localhost:44347',
    cacheLocation: 'sessionStorage'
};
export const authContext = new AuthenticationContext(adalConfig);
export const getToken = () => {
    return authContext.getCachedToken(authContext.config.clientId);
};

//'https://fgoutility20181217092958.azurewebsites.net'