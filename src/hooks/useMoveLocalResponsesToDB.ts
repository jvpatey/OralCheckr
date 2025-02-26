import { useMutation } from "@tanstack/react-query";
import { moveLocalResponsesToDB } from "../services/authService";

export const useMoveLocalResponsesToDB = () => {
  return useMutation<void, Error, number>({
    mutationFn: (userId: number) => moveLocalResponsesToDB(userId),
  });
};
