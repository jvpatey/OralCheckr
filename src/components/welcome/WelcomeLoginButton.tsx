import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.accentBackgroundColor};
  border: 2px solid ${({ theme }) => theme.green};
  width: 45%;
  margin: 10px;
  border-radius: 10px;
  padding: 0.5em 1em;
  cursor: pointer;
  display: block;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.green};
    border-color: ${({ theme }) => theme.green};
  }

  @media (max-width: 768px) {
    width: 80%;
    font-size: 1rem;
    padding: 0.4em 0.8em;
  }
`;

interface WelcomeLoginButtonProps {
  onClick: () => void;
}

export function WelcomeLoginButton({ onClick }: WelcomeLoginButtonProps) {
  return <Button onClick={onClick}>Login</Button>;
}
