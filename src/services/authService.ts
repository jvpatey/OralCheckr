import {
  REGISTER_ENDPOINT,
  LOGIN_ENDPOINT,
  GUEST_LOGIN_ENDPOINT,
  VALIDATION_ENDPOINT,
  LOGOUT_ENDPOINT,
  CONVERT_GUEST_ENDPOINT,
} from "../config/authApiConfig";

/* -- Registration Service -- */

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message?: string;
  userId: number;
}

export const registerUser = async (
  userData: RegisterData
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
    }

    const result = await response.json();

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Unexpected error occurred.");
  }
};

/* -- Login Service -- */

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  message: string;
}

export const loginUser = async (
  loginData: LoginData
): Promise<LoginResponse> => {
  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    const result = await response.json();

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Unexpected error occurred.");
  }
};

/* -- Guest Login Service -- */

export const handleGuestLogin = async (): Promise<{
  userId: number;
  role: string;
}> => {
  try {
    const response = await fetch(GUEST_LOGIN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to log in as guest");
    }

    const { userId, role } = await response.json();
    return { userId, role };
  } catch (err: any) {
    console.error("Guest login error:", err.message);
    throw new Error("Unable to log in as guest. Please try again.");
  }
};

/* -- Logout Service -- */
export const logoutUser = async (): Promise<void> => {
  try {
    const response = await fetch(LOGOUT_ENDPOINT, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Logout failed");
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

/* -- User Authorization Service -- */

export interface AuthResponse {
  user: { userId: number; role?: string };
}

export const validateAuth = async (): Promise<AuthResponse | null> => {
  try {
    const res = await fetch(VALIDATION_ENDPOINT, { credentials: "include" });
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Auth validation failed:", error);
    return null;
  }
};

/* -- Convert guest user to registered user on signup service -- */

export const convertGuestToUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<{ userId: number }> => {
  const response = await fetch(CONVERT_GUEST_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Conversion failed");
  }
  return response.json();
};
