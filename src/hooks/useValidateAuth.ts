import { useQuery } from "@tanstack/react-query";
import { validateAuth, AuthResponse } from "../services/authService";

export const useValidateAuth = () => {
  return useQuery<AuthResponse | null, Error>({
    queryKey: ["auth"],
    queryFn: validateAuth,
    refetchOnWindowFocus: false,
  });
};
