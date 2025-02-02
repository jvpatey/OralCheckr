import { REGISTER_ENDPOINT } from "../config/apiConfig";
import { LOGIN_ENDPOINT } from "../config/apiConfig";

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
  access_token: string;
}

export const registerUser = async (
  userData: RegisterData
): Promise<RegisterResponse> => {
  const response = await fetch(REGISTER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Registration failed");
  }

  return response.json();
};

/* -- Login Service -- */

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  email: string;
  access_token: string;
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
