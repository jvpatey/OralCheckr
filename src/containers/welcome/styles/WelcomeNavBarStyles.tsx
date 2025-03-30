import styled from "styled-components";
import { Link } from "react-router-dom";

export const ThemeToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 20px;
`;

export const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.blue};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.green};
    transform: translateY(-2px);
  }
`;
