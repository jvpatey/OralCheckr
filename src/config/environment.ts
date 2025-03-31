/* -- Environment Configuration -- */

export const getApiBaseUrl = () => {
  // Check if we're in development mode
  const isDevelopment = import.meta.env.DEV;

  // check .env file for dev or prod url
  const apiUrl =
    import.meta.env.VITE_API_URL ||
    (isDevelopment
      ? "http://localhost:3000"
      : "https://oralcheckr-backend.onrender.com");

  return apiUrl;
};

// Export the base URL
export const API_BASE_URL = getApiBaseUrl();

// Add Google client ID
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
