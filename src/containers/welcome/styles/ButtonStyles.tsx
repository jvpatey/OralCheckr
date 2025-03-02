import styled from "styled-components";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "guest"
  | "login"
  | "signup";

interface BaseButtonProps {
  $variant?: ButtonVariant;
}

export const BaseButton = styled.button<BaseButtonProps>`
  background-color: ${({ theme, $variant }) => {
    switch ($variant) {
      case "primary":
        return theme.blue;
      case "secondary":
        return theme.darkGrey;
      case "guest":
        return theme.darkGrey;
      case "login":
        return theme.green;
      case "signup":
        return theme.blue;
      default:
        return theme.blue;
    }
  }};
  color: ${({ theme }) => theme.accentBackgroundColor};
  border: 2px solid
    ${({ theme, $variant }) => {
      switch ($variant) {
        case "primary":
          return theme.blue;
        case "secondary":
          return theme.darkGrey;
        case "guest":
          return theme.darkGrey;
        case "login":
          return theme.green;
        case "signup":
          return theme.blue;
        default:
          return theme.blue;
      }
    }};
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
    color: ${({ theme, $variant }) => {
      switch ($variant) {
        case "primary":
          return theme.blue;
        case "secondary":
          return theme.darkGrey;
        case "guest":
          return theme.darkGrey;
        case "login":
          return theme.green;
        case "signup":
          return theme.blue;
        default:
          return theme.blue;
      }
    }};
    border-color: ${({ theme, $variant }) => {
      switch ($variant) {
        case "primary":
          return theme.blue;
        case "secondary":
          return theme.darkGrey;
        case "guest":
          return theme.darkGrey;
        case "login":
          return theme.green;
        case "signup":
          return theme.blue;
        default:
          return theme.blue;
      }
    }};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 80%;
    font-size: 1rem;
    padding: 0.4em 0.8em;
  }
`;
