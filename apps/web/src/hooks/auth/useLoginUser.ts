import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  LoginData,
  LoginResponse,
} from "../../services/authService";

// Hook for user login
export const useLoginUser = () => {
  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: loginUser,
  });
};
