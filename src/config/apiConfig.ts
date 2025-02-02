export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const BASE_PATH =
  import.meta.env.NODE_ENV === "development"
    ? ""
    : import.meta.env.VITE_API_BASE_PATH || "";

// Construct the register endpoint URL
export const REGISTER_ENDPOINT = `${BASE_URL}${BASE_PATH}/auth/register`;
