import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  LoginData,
  LoginResponse,
} from "../../services/authService";

export const useLoginUser = () => {
  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: loginUser,
  });
};
