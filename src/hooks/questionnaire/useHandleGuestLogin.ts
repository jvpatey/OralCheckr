import { useMutation } from "@tanstack/react-query";
import { handleGuestLogin } from "../../services/authService";

export const useHandleGuestLogin = () => {
  return useMutation({
    mutationFn: handleGuestLogin,
    onError: (error: Error) => {
      console.error("Error logging in as guest:", error.message);
    },
  });
};
