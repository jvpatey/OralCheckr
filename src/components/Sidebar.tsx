import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { getFullPath } from "../common/Routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

// Apply the animation to the sidebar container
const SidebarContainer = styled.div`
  height: calc(100vh - 56px);
  width: 190px;
  position: fixed;
  top: 60px;
  left: 0;
  background-color: #3f93b2;
  color: #222831;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  margin-top: 10px;
  border-top-right-radius: 20px;
  animation: ${fadeInLeft} 1s ease-in-out;

  @media (max-width: 768px) {
    width: 70px;
  }
`;

const SidebarLink = styled(Link)`
  width: 100%;
  font-size: 15px;
  padding: 15px 20px;
  text-align: left;
  text-decoration: none;
  color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  margin-left: 10px;

  &:hover {
    color: #f5f5f5;
    transform: scale(1.05);
  }

  &.active {
    font-weight: 800;
    color: #dfdfdf;
    font-size: 17px;
  }

  @media (max-width: 768px) {
    justify-content: center;
    padding: 10px;
    margin-right: 15px;

    &.active {
      font-weight: 800;
      color: #f5f5f5;
      font-size: 20px;
    }
  }

  @media (max-width: 768px) {
    &::after {
      content: attr(data-tooltip);
      position: absolute;
      left: 60px;
      top: 50%;
      transform: translateY(-50%);
      background: #222831;
      color: #f5f5f5;
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

const Icon = styled.span`
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const Text = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

interface SidebarProps {
  links: { name: string; path: string; icon: any }[];
}

export function Sidebar({ links }: SidebarProps) {
  const location = useLocation();

  return (
    <SidebarContainer>
      {links.map((link, index) => (
        <SidebarLink
          to={getFullPath(link.path)}
          key={index}
          className={
            location.pathname === getFullPath(link.path) ? "active" : ""
          }
          data-tooltip={link.name}
        >
          <Icon>
            <FontAwesomeIcon icon={link.icon} />
          </Icon>
          <Text>{link.name}</Text>
        </SidebarLink>
      ))}
    </SidebarContainer>
  );
}
