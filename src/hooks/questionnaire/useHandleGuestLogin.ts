import { useMutation } from "@tanstack/react-query";
import { handleGuestLogin } from "../../services/authService";

export const useHandleGuestLogin = () => {
  return useMutation({
    mutationFn: handleGuestLogin,
    onSuccess: () => {
      if (process.env.NODE_ENV === "development") {
        console.log("Logged in as guest successfully");
      }
    },
    onError: (error: Error) => {
      console.error("Error logging in as guest:", error.message);
    },
  });
};
