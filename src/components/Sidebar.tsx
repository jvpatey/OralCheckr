import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { getFullPath } from "../common/Routes";

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const SidebarContainer = styled.div`
  height: calc(100vh - 56px);
  width: 200px;
  position: fixed;
  top: 56px;
  left: 0;
  transform: translateX(-100%);
  background-color: #e0e0e0;
  color: #222831;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  z-index: 1000;
  animation: ${slideInFromLeft} 1.5s forwards;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 80px;
  }
`;

const SidebarLink = styled(Link)`
  width: 100%;
  padding: 15px 20px;
  text-align: left;
  text-decoration: none;
  color: #222831;
  &:hover {
    color: #07889b;
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    text-align: center;
    padding: 10px;
  }
`;

interface SidebarProps {
  links: { name: string; path: string }[];
}

export function Sidebar({ links }: SidebarProps) {
  return (
    <SidebarContainer>
      {links.map((link, index) => (
        <SidebarLink to={getFullPath(link.path)} key={index}>
          {link.name}
        </SidebarLink>
      ))}
    </SidebarContainer>
  );
}
