import { useMutation } from "@tanstack/react-query";
import {
  registerUser,
  RegisterData,
  RegisterResponse,
} from "../../services/authService";

export const useRegisterUser = () => {
  return useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: registerUser,
  });
};
