import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../services/authService";

// Hook for user logout
export const useLogoutUser = () => {
  return useMutation<void, Error, void>({
    mutationFn: logoutUser,
  });
};
