import styled, { keyframes } from "styled-components";
import { Nav } from "react-bootstrap";
export { Nav };
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const PageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.backgroundColor};
  overflow-y: auto;
  padding: calc(56px + 2rem) 0 2rem 0;
`;

export const ProfileCard = styled.div`
  background: ${({ theme }) => theme.accentBackgroundColor};
  padding: 2.5rem 3rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 800px;
  height: fit-content;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 900px) {
    margin: 0 2rem 2rem;
    width: calc(100% - 4rem);
    padding: 1.5rem;
  }
`;

export const ProfileHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    text-align: center;
  }
`;

export const ProfilePictureSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ProfilePicture = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${({ theme }) => theme.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${({ theme }) => theme.textGrey};
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.9rem;
  cursor: pointer;
  overflow: hidden;
  text-align: center;
  padding: 1rem;

  &:hover {
    border-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.blue};
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;

export const UploadButton = styled.button`
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.backgroundColor};
  width: auto;
  height: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  padding: 0 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  white-space: nowrap;
  border: 2px solid ${({ theme }) => theme.blue};
  font-size: 15px;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.blue};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0 15px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
    font-size: 12px;
  }
`;

export const ProfileInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-content: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const InfoGroup = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    text-align: left;
  }
`;

export const Label = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textGrey};
  margin-bottom: 0.5rem;
`;

export const Value = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-size: 1rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.backgroundColor};
  border-radius: 4px;
`;

export const StyledNav = styled(Nav)`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.textGrey};
  display: flex;
  flex-wrap: wrap;

  .nav-link {
    color: ${({ theme }) => theme.textGrey};
    padding: 0.75rem 1.5rem;
    white-space: nowrap;
    margin-bottom: -1px;
    border: 1px solid transparent;
    border-radius: 4px 4px 0 0;
    background: transparent;

    &.active {
      color: ${({ theme }) => theme.blue};
      background: ${({ theme }) => theme.accentBackgroundColor};
      border-color: ${({ theme }) => theme.textGrey}
        ${({ theme }) => theme.textGrey}
        ${({ theme }) => theme.accentBackgroundColor}
        ${({ theme }) => theme.textGrey};
    }

    &:hover:not(.active) {
      color: ${({ theme }) => theme.blue};
    }

    @media (max-width: 480px) {
      padding: 0.75rem 1rem;
    }
  }
`;

export const TabContent = styled.div`
  padding: 1.5rem 0;
  background: ${({ theme }) => theme.accentBackgroundColor};

  h3 {
    color: ${({ theme }) => theme.darkGrey};
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;
