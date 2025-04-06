import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Fade-in from left animation
const fadeInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const SidebarContainer = styled.div`
  height: calc(100vh - 56px);
  width: 190px;
  position: fixed;
  top: 80px;
  left: 0;
  background-color: ${({ theme }) => theme.blue};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
  padding-left: 10px;
  margin-top: 10px;
  border-top-right-radius: 12px;
  z-index: 900;
  animation: ${fadeInLeft} 1s ease-in-out;

  @media (max-width: 800px) {
    width: 50px;
    align-items: center;
    padding-left: 0;
  }

  @media (max-width: 800px) {
    padding-left: 0;
    padding-top: 10px;
    margin-top: 10px;
  }
`;

export const SidebarLink = styled(Link)`
  width: calc(100% - 20px);
  font-size: 17px;
  padding: 10px 20px;
  text-align: left;
  text-decoration: none;
  color: ${({ theme }) => theme.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 17px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.backgroundColor};
  }

  &.active {
    color: ${({ theme }) => theme.backgroundColor};
    font-size: 17px;
    padding: 10px 20px;
    overflow: hidden;

    &:after {
      content: "";
      position: absolute;
      bottom: 5px;
      left: 20px;
      width: calc(100% - 40px);
      height: 2px;
      background-color: ${({ theme }) => theme.green};
    }
  }

  @media (max-width: 800px) {
    justify-content: center;
    padding: 10px;
    margin-right: 0;
    margin-left: 0;
    width: auto;

    &.active {
      color: ${({ theme }) => theme.backgroundColor};
      font-size: 18px;
      padding: 8px;

      &:after {
        left: 2px;
        width: calc(100% - 4px);
      }
    }

    &::after {
      content: attr(data-tooltip);
      position: absolute;
      left: 60px;
      top: 50%;
      transform: translateY(-50%);
      background: ${({ theme }) => theme.darkGrey};
      color: ${({ theme }) => theme.backgroundColor};
      padding: 2px 5px;
      border-radius: 4px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
      font-size: 10px;
    }

    &:hover::after {
      opacity: 1;
    }
  }
`;

export const Icon = styled.span`
  margin-right: 10px;

  @media (max-width: 800px) {
    margin-right: 0;
  }
`;

export const Text = styled.span`
  @media (max-width: 800px) {
    display: none;
  }
`;
