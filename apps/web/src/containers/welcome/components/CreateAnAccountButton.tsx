import { Button } from "./Button";

interface CreateAnAccountButtonProps {
  onClick: () => void;
}

export function CreateAnAccountButton({ onClick }: CreateAnAccountButtonProps) {
  return (
    <Button variant="signup" onClick={onClick}>
      Create an account
    </Button>
  );
}
