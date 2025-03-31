import { PROFILE_ENDPOINT } from "../config/authApiConfig";
import { apiRequest } from "./apiUtils";

interface ProfileData {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  isGuest: boolean;
  avatar?: string;
}

interface ProfileUpdateData extends Record<string, unknown> {
  avatar?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

/* -- Service to fetch user profile -- */
export async function getProfile(): Promise<ProfileData> {
  const response = await apiRequest<ProfileData>(PROFILE_ENDPOINT, "GET");
  return response;
}

/* -- Service to update user profile -- */
export async function updateProfile(
  data: ProfileUpdateData
): Promise<ProfileData> {
  const response = await apiRequest<ProfileData>(PROFILE_ENDPOINT, "PUT", data);
  return response;
}

/* -- Service to delete user account -- */
export async function deleteAccount(): Promise<void> {
  await apiRequest(PROFILE_ENDPOINT, "DELETE");
}
