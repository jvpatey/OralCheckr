import {
  REGISTER_ENDPOINT,
  LOGIN_ENDPOINT,
  GUEST_LOGIN_ENDPOINT,
  VALIDATION_ENDPOINT,
  LOGOUT_ENDPOINT,
  CONVERT_GUEST_ENDPOINT,
  GOOGLE_LOGIN_ENDPOINT,
} from "../config/authApiConfig";
import { apiRequest, handleApiError } from "./apiUtils";

/* -- Registration Service -- */

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  [key: string]: unknown;
}

export interface RegisterResponse {
  message?: string;
  userId: number;
}

export const registerUser = async (
  userData: RegisterData
): Promise<RegisterResponse> => {
  try {
    return await apiRequest<RegisterResponse>(
      REGISTER_ENDPOINT,
      "POST",
      userData
    );
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

/* -- Login Service -- */

export interface LoginData {
  email: string;
  password: string;
  [key: string]: unknown;
}

export interface LoginResponse {
  userId: number;
  message: string;
  role?: string;
}

export const loginUser = async (
  loginData: LoginData
): Promise<LoginResponse> => {
  try {
    return await apiRequest<LoginResponse>(LOGIN_ENDPOINT, "POST", loginData);
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

/* -- Guest Login Service -- */

export interface GuestLoginResponse {
  userId: number;
  role: string;
}

export const handleGuestLogin = async (): Promise<GuestLoginResponse> => {
  try {
    const response = await apiRequest<GuestLoginResponse>(
      GUEST_LOGIN_ENDPOINT,
      "POST"
    );

    // Ensure the role is set to "guest" explicitly
    if (!response.role) {
      response.role = "guest";
    }

    return response;
  } catch (error) {
    throw error;
  }
};

/* -- Logout Service -- */
export const logoutUser = async (): Promise<void> => {
  try {
    await apiRequest<void>(LOGOUT_ENDPOINT, "POST");
  } catch (error) {
    // Silently handle logout errors
  }
};

/* -- User Authorization Service -- */

export interface AuthResponse {
  user: {
    userId: number;
    role?: string;
    firstName?: string;
    lastName?: string;
  };
}

export const validateAuth = async (): Promise<AuthResponse | null> => {
  // Don't validate on welcome page
  const isWelcomePage =
    window.location.pathname === "/" || window.location.hash === "#/";
  if (isWelcomePage) {
    return null;
  }

  try {
    const response = await apiRequest<AuthResponse>(VALIDATION_ENDPOINT, "GET");

    // If no user data, return null (not authenticated)
    if (!response?.user) {
      return null;
    }

    if (response.user && response.user.role === undefined) {
      response.user.role = "user";
    }

    // Add guest user info if needed
    if (response.user && response.user.role === "guest") {
      response.user.firstName = "Guest";
      response.user.lastName = "User";
    }

    return response;
  } catch (error) {
    // Silent handling of 401 errors - expected when not authenticated
    if (error instanceof Error && error.message.includes("401")) {
      return null;
    }
    // Silent handling for all auth validation errors
    return null;
  }
};

/* -- Convert guest user to registered user on signup service -- */

export const convertGuestToUser = async (
  userData: RegisterData
): Promise<{ userId: number }> => {
  try {
    return await apiRequest<{ userId: number }>(
      CONVERT_GUEST_ENDPOINT,
      "POST",
      userData
    );
  } catch (error) {
    throw error;
  }
};

/* -- Google Login Service -- */
export interface GoogleLoginData {
  credential: string;
  [key: string]: unknown;
}

export const googleLogin = async (
  googleData: GoogleLoginData
): Promise<LoginResponse> => {
  try {
    const transformedData = {
      token: googleData.credential,
    };

    return await apiRequest<LoginResponse>(
      GOOGLE_LOGIN_ENDPOINT,
      "POST",
      transformedData
    );
  } catch (error) {
    throw error;
  }
};

/* -- Error handler for authentication service errors -- */
export const handleAuthServiceError = (error: any): string => {
  return handleApiError(error, "Authentication");
};
