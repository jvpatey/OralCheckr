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

export const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 50px;
  }
`;

export const slideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
    max-height: 50px;
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
    max-height: 0;
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
  z-index: 800;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `${theme.textGrey}40`};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => `${theme.textGrey}60`};
  }
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

export const ProfilePicture = styled.div<{ $hasAvatar?: boolean }>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${({ theme }) => theme.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px
    ${({ $hasAvatar, theme }) =>
      $hasAvatar ? `solid ${theme.blue}` : `dashed ${theme.textGrey}`};
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.9rem;
  cursor: pointer;
  overflow: hidden;
  text-align: center;
  padding: 1rem;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.blue};
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0.5rem;
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
  position: relative;

  * {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .email-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    grid-column: 1 / -1;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const ProfileEditButton = styled.button`
  position: absolute;
  top: -1.5rem;
  right: -2rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.textGrey};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  z-index: 1;

  &:hover {
    color: ${({ theme }) => theme.blue};
  }

  svg {
    font-size: 1.1rem;
  }

  @media (max-width: 900px) {
    top: -1.25rem;
    right: -1rem;
  }

  @media (max-width: 480px) {
    top: -1rem;
    right: -0.5rem;
    font-size: 0.85rem;
    padding: 6px;

    svg {
      font-size: 1rem;
    }
  }
`;

export const InfoGroup = styled.div`
  margin-bottom: 1rem;
  position: relative;
  transform-origin: top;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    margin 0.5s cubic-bezier(0.4, 0, 0.2, 1);

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

export const Value = styled.div<{ $isEditing?: boolean }>`
  color: ${({ theme }) => theme.darkGrey};
  font-size: 1rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.backgroundColor};
  border-radius: 4px;
  border: 1px solid transparent;
  transition: all 0.2s ease;

  ${({ $isEditing, theme }) =>
    $isEditing &&
    `
    border-color: ${theme.blue};
    background: ${theme.backgroundColor};
  `}
`;

export const EditActions = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 44px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    gap: 0.35rem;
  }
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textGrey};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;

export const EditInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.darkGrey};
  background: ${({ theme }) => theme.backgroundColor};
  border: 1px solid ${({ theme }) => theme.blue};
  border-radius: 4px;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.blue}40`};
  }
`;

export const EditActionButton = styled.button<{ $isCancel?: boolean }>`
  padding: 0 1.25rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    padding: 0.25rem 0.75rem;
    height: 28px;
    font-size: 0.85rem;
  }

  ${({ $isCancel, theme }) =>
    $isCancel
      ? `
    background: ${theme.backgroundColor};
    color: ${theme.textGrey};
    border: 1px solid ${theme.textGrey};

    &:hover {
      background: ${theme.textGrey};
      color: ${theme.backgroundColor};
      border: 1px solid ${theme.textGrey};
    }
  `
      : `
    background: ${theme.green};
    color: ${theme.backgroundColor};
    border: 1px solid ${theme.green};

    &:hover {
      background: ${theme.backgroundColor};
      color: ${theme.green};
      border: 1px solid ${theme.green};
    }
  `}
`;

export const StyledNav = styled(Nav)`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.textGrey};
  display: flex;
  flex-wrap: wrap;

  .nav-link {
    color: ${({ theme }) => theme.textGrey};
    padding: 0.9rem 1.75rem;
    white-space: nowrap;
    margin-bottom: -1px;
    border: 1px solid transparent;
    border-radius: 6px 6px 0 0;
    background: transparent;
    font-size: 1.1rem;
    font-weight: 500;
    transition: all 0.2s ease;

    &.active {
      color: ${({ theme }) => theme.blue};
      background: ${({ theme }) => theme.accentBackgroundColor};
      border-color: ${({ theme }) => theme.textGrey}
        ${({ theme }) => theme.textGrey}
        ${({ theme }) => theme.accentBackgroundColor}
        ${({ theme }) => theme.textGrey};
      box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
    }

    &:hover:not(.active) {
      color: ${({ theme }) => theme.blue};
      background-color: rgba(0, 0, 0, 0.02);
    }

    @media (max-width: 480px) {
      padding: 0.75rem 1.25rem;
      font-size: 1rem;
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

export const EditInstructions = styled.p`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.9rem;
  grid-column: 1 / -1;
  text-align: left;
  margin: 0;
  padding: 0;
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  pointer-events: none;

  &.entering {
    max-height: 50px;
    opacity: 1;
    transform: translateY(0);
    margin-bottom: 1rem;
    pointer-events: auto;
  }

  &.exiting {
    max-height: 0;
    opacity: 0;
    transform: translateY(-20px);
    margin: 0;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;
