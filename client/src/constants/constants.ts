const API_URL = (import.meta.env.VITE_NODE_ENV === 'production') ?
    import.meta.env.VITE_BASE_URL
    :
    'http://localhost:3001';
export const AUTH_BASE_URL = API_URL + '/api/auth/'
export const SERVICE_BASE_URL = API_URL + '/api/service/'
export const PROFILE_BASE_URL = API_URL + '/api/profile/'
