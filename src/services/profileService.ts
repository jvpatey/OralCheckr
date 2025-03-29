import { PROFILE_ENDPOINT } from "../config/authApiConfig";
import { apiRequest } from "./apiUtils";

export interface ProfileData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  isGuest: boolean;
}

/* -- Service to fetch user profile -- */
export const fetchProfile = async (): Promise<ProfileData> => {
  try {
    return await apiRequest<ProfileData>(PROFILE_ENDPOINT, "GET");
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
