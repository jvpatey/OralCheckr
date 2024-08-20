import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../common/color-utils";

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

const SidebarContainer = styled.div`
  height: calc(100vh - 56px);
  width: 200px;
  position: fixed;
  top: 60px;
  left: 0;
  background-color: ${colors.blue};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
  padding-left: 10px;
  margin-top: 10px;
  border-top-right-radius: 12px;
  animation: ${fadeInLeft} 1s ease-in-out;

  @media (max-width: 768px) {
    width: 70px;
    align-items: center;
    padding-left: 0;
  }
`;

const SidebarLink = styled(Link)`
  width: calc(100% - 20px);
  font-size: 17px;
  padding: 10px 20px;
  text-align: left;
  text-decoration: none;
  color: ${colors.bgWhite};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 17px;
  border-radius: 10px;
  overflow: hidden;

  &:hover {
    color: ${colors.bgWhite};
    transform: scale(1.05);
    background-color: ${colors.green};
  }

  &.active {
    font-weight: 800;
    font-size: 17px;
    background-color: ${colors.green};
    color: ${colors.bgWhite};
    border-radius: 10px;
    padding: 10px 20px;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    justify-content: center;
    padding: 10px;
    margin-right: 0;
    margin-left: 0;
    width: auto;

    &.active {
      font-weight: 800;
      color: ${colors.bgWhite};
      font-size: 18px;
      background-color: ${colors.green};
      padding: 8px;
      border-radius: 10px;
    }
  }

  @media (max-width: 768px) {
    &::after {
      content: attr(data-tooltip);
      position: absolute;
      left: 60px;
      top: 50%;
      transform: translateY(-50%);
      background: ${colors.darkGrey};
      color: ${colors.bgWhite};
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

// Functional component to render the sidebar - used on the habit tracker pages
export function Sidebar({ links }: SidebarProps) {
  const location = useLocation();

  return (
    <SidebarContainer>
      {links.map((link, index) => (
        <SidebarLink
          to={link.path}
          key={index}
          className={location.pathname === link.path ? "active" : ""}
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
