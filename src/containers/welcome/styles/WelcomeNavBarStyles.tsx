import styled from "styled-components";
import { Link } from "react-router-dom";

export const ThemeToggleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 8px 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 6px 15px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    padding: 4px 10px;
    margin-bottom: 12px;
  }
`;

export const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const StyledLink = styled(Link)`
  /* Modern glassmorphism button styling */
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  
  color: ${({ theme }) => theme.textPrimary};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.borderLight};
  
  /* Enhanced shadow */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;

  @media (max-width: 768px) {
    padding: 10px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    border-radius: 8px;
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.2) inset;
    border-color: ${({ theme }) => theme.primary};
  }

  &:active {
    transform: translateY(0) scale(1.02);
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.glassBg};
    backdrop-filter: blur(${({ theme }) => theme.glassBlur});
    color: ${({ theme }) => theme.textPrimary};
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border: 1px solid ${({ theme }) => theme.borderLight};
    pointer-events: none;
    z-index: 1000;
  }
`;

export const TooltipWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Modern glassmorphism button styling */
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.borderLight};
  
  /* Enhanced shadow */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    padding: 10px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    border-radius: 8px;
  }

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.2) inset;
    border-color: ${({ theme }) => theme.primary};
  }

  &:active {
    transform: translateY(0) scale(1.02);
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.glassBg};
    backdrop-filter: blur(${({ theme }) => theme.glassBlur});
    color: ${({ theme }) => theme.textPrimary};
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border: 1px solid ${({ theme }) => theme.borderLight};
    pointer-events: none;
    z-index: 1000;
  }
`;
