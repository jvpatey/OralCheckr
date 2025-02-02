import { REGISTER_ENDPOINT } from "../config/apiConfig";

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
