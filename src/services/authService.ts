import { REGISTER_ENDPOINT } from "../config/authApiConfig";
import { LOGIN_ENDPOINT } from "../config/authApiConfig";
import { GUEST_LOGIN_ENDPOINT } from "../config/authApiConfig";

/* -- Registration Service -- */

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  email: string;
  userId: number;
  accessToken: string;
}

export const registerUser = async (
  userData: RegisterData
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
    }

    return response.json();
  } catch (error: any) {
    console.error("Network or server error:", error.message);
    throw new Error("Unable to connect to the server. Please try again later.");
  }
};

/* -- Login Service -- */

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  email: string;
  accessToken: string;
}

export const loginUser = async (
  loginData: LoginData
): Promise<LoginResponse> => {
  const response = await fetch(LOGIN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Login failed");
  }

  return response.json();
};

/* -- Guest Login -- */

export const handleGuestLogin = async () => {
  try {
    const response = await fetch(GUEST_LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to log in as guest");
    }

    const data = await response.json();

    // Store the guest token
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem(
      "user",
      JSON.stringify({
        userId: data.userId,
        role: data.role,
      })
    );
    localStorage.setItem("authenticated", "true");
  } catch (err: any) {
    console.error("Guest login error:", err.message);
    throw new Error("Unable to log in as guest. Please try again.");
  }
};
