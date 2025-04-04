import { API_BASE_URL } from "./environment";

// Authentication Endpoints
export const REGISTER_ENDPOINT = `${API_BASE_URL}/auth/register`;
export const LOGIN_ENDPOINT = `${API_BASE_URL}/auth/login`;
export const GUEST_LOGIN_ENDPOINT = `${API_BASE_URL}/auth/guest-login`;
export const VALIDATION_ENDPOINT = `${API_BASE_URL}/auth/validate`;
export const LOGOUT_ENDPOINT = `${API_BASE_URL}/auth/logout`;
export const CONVERT_GUEST_ENDPOINT = `${API_BASE_URL}/auth/convert-guest`;
export const PROFILE_ENDPOINT = `${API_BASE_URL}/auth/profile`;
export const GOOGLE_LOGIN_ENDPOINT = `${API_BASE_URL}/auth/google-login`;
