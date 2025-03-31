import { useMutation } from "@tanstack/react-query";
import { googleLogin, GoogleLoginData } from "../../services/authService";
import { handleAuthServiceError } from "../../services/authService";

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: (googleData: GoogleLoginData) => googleLogin(googleData),
    onError: (error: Error) => {
      console.error("Google login error:", error);
      return handleAuthServiceError(error);
    },
  });
};
