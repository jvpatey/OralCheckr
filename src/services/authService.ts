import {
  REGISTER_ENDPOINT,
  LOGIN_ENDPOINT,
  GUEST_LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
} from "../config/authApiConfig";

/* -- Registration Service -- */

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
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
      let errorMessage = "Registration failed";
      try {
        const errorData = await response.json();
        if (errorData.error) errorMessage = errorData.error;
      } catch {
        console.error("Error parsing server response");
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error: any) {
    console.error("Network or server error:", error.message);
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
      let errorMessage = "Login failed";
      try {
        const errorData = await response.json();
        if (errorData.error) errorMessage = errorData.error;
      } catch {
        console.error("Error parsing server response");
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error: any) {
    console.error("Network or server error:", error.message);
    throw new Error(error.message || "Unexpected error occurred.");
  }
};

/* -- Guest Login Service -- */

export const handleGuestLogin = async (): Promise<void> => {
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
    localStorage.setItem("authenticated", "true");
  } catch (err: any) {
    console.error("Guest login error:", err.message);
    throw new Error("Unable to log in as guest. Please try again.");
  }
};

/* -- Logout Service -- */

export const logoutUser = async (): Promise<void> => {
  try {
    await fetch(LOGOUT_ENDPOINT, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
