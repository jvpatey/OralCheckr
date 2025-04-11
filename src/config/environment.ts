/* -- Environment Configuration -- */

// Returns the appropriate API URL based on environment:
export const getApiBaseUrl = () => {
  // Check if in development mode
  const isDevelopment = import.meta.env.DEV;

  // check .env file for dev or prod url
  const apiUrl =
    import.meta.env.VITE_API_URL ||
    (isDevelopment
      ? "http://localhost:3000"
      : "https://oralcheckr-backend.onrender.com");

  return apiUrl;
};

// Base URL for all API requests
export const API_BASE_URL = getApiBaseUrl();

// Google OAuth client ID for authentication
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
