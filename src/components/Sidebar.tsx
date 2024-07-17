import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarContainer = styled.div`
  height: 100vh;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #e0e0e0;
  color: #222831;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

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

const SidebarHeader = styled.h3`
  margin-bottom: 30px;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

interface SidebarProps {
  links: { name: string; path: string }[];
}

export function Sidebar({ links }: SidebarProps) {
  return (
    <SidebarContainer>
      <SidebarHeader>OralCheckr</SidebarHeader>
      {links.map((link, index) => (
        <SidebarLink to={link.path} key={index}>
          {link.name}
        </SidebarLink>
      ))}
    </SidebarContainer>
  );
}
