import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { getFullPath } from "../common/Routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarContainer = styled.div`
  height: calc(100vh - 56px);
  width: 190px;
  position: fixed;
  top: 60px;
  left: 0;
  background-color: #e0e0e0;
  color: #222831;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  border-top-right-radius: 20px;

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
  color: #222831;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #222831;
  position: relative;

  &:hover {
    color: #07889b;
    transform: scale(1.05);
  }

  &.active {
    font-weight: bold;
    color: #07889b;
  }

  @media (max-width: 768px) {
    justify-content: center;
    padding: 10px;
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
          <span className="d-lg-inline d-none">{link.name}</span>
        </SidebarLink>
      ))}
    </SidebarContainer>
  );
}
