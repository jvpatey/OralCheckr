import { useMutation } from "@tanstack/react-query";
import {
  registerUser,
  RegisterData,
  RegisterResponse,
} from "../../services/authService";

// Hook for user registration
export const useRegisterUser = () => {
  return useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: registerUser,
  });
};
