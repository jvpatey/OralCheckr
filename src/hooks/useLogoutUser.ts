import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/authService";

export const useLogoutUser = () => {
  return useMutation<void, Error, void>({
    mutationFn: logoutUser,
  });
};
