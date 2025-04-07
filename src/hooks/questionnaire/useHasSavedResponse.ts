import { useQuery } from "@tanstack/react-query";
import { hasSavedResponse } from "../../services/quesService";
import { useContext } from "react";
import { AuthContext } from "../../containers/authentication/AuthContext";

export const useHasSavedResponse = () => {
  const { user } = useContext(AuthContext);

  // Check if the user is a guest
  const isGuest =
    user?.role === "guest" ||
    (user?.firstName === "Guest" && user?.lastName === "User");

  return useQuery({
    queryKey: ["hasSavedResponse"],
    queryFn: hasSavedResponse,
    // Skip API calls for guest users
    enabled: !isGuest,
    retry: false,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
