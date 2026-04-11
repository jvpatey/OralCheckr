import { Button } from "./Button";

interface WelcomeLoginButtonProps {
  onClick: () => void;
}

export function WelcomeLoginButton({ onClick }: WelcomeLoginButtonProps) {
  return (
    <Button variant="login" onClick={onClick}>
      Login
    </Button>
  );
}
