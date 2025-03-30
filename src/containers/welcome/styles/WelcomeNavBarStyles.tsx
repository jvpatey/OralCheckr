import styled from "styled-components";
import { Link } from "react-router-dom";

export const ThemeToggleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 8px 20px;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;

  &:hover {
    color: ${({ theme }) => theme.green};
    transform: translateY(-2px);
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.green};
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    pointer-events: none;
  }
`;

export const TooltipWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover::after {
    opacity: 1;
    visibility: visible;
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.green};
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    pointer-events: none;
  }
`;
