import { useState, useEffect } from "react";
import { fetchProfile, ProfileData } from "../../services/profileService";
import { handleApiError } from "../../services/apiUtils";

interface UseProfileReturn {
  profile: ProfileData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProfile = (): UseProfileReturn => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProfile();
      setProfile(data);
    } catch (error) {
      const errorMessage = handleApiError(error, "Profile");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    refetch: getProfile,
  };
};
