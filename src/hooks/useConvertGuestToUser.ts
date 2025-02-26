import { useMutation } from "@tanstack/react-query";
import { convertGuestToUser } from "../services/authService";

export const useConvertGuestToUser = () => {
  return useMutation<
    { userId: number },
    Error,
    {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }
  >({
    mutationFn: convertGuestToUser,
  });
};
