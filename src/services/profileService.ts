import { PROFILE_ENDPOINT } from "../config/authApiConfig";
import { apiRequest } from "./apiUtils";

export interface ProfileData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  isGuest: boolean;
  avatar?: string;
}

/* -- Service to fetch user profile -- */
export const fetchProfile = async (): Promise<ProfileData> => {
  try {
    const data = await apiRequest<ProfileData>(PROFILE_ENDPOINT, "GET");
    console.log("Fetched profile data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

/* -- Service to update user profile -- */
export const updateProfile = async (data: {
  avatar?: string;
}): Promise<ProfileData> => {
  try {
    console.log("Sending profile update:", data);
    const response = await apiRequest<ProfileData>(
      PROFILE_ENDPOINT,
      "PUT",
      data
    );
    console.log("Profile update response:", response);
    return response;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
