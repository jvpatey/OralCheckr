import styled from "styled-components";
import {
  StyledModal,
  ModalHeader,
  ModalTitleStack,
  ModalHeading,
  ModalHeadingAccent,
  ModalBody,
} from "../../../welcome/styles/ModalStyles";
import { AVATAR_OPTIONS } from "../../constants/avatarOptions";

const WiderModal = styled(StyledModal)`
  .modal-dialog {
    max-width: 520px;
  }
`;

const AccountPhotoBlock = styled.div`
  margin-bottom: 1.25rem;
`;

const AccountPhotoButton = styled.button<{ $isSelected?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 16px;
  cursor: pointer;
  text-align: left;
  border: 2px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? theme.primary : theme.borderLight};
  background: ${({ theme }) => theme.surfaceElevated};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    border: 1px solid ${({ theme }) => theme.borderLight};
  }
`;

const AccountPhotoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;

  strong {
    font-family: var(--font-sans), system-ui, sans-serif;
    font-size: 0.9375rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.textPrimary};
  }

  span {
    font-family: var(--font-sans), system-ui, sans-serif;
    font-size: 0.8125rem;
    line-height: 1.35;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 4px 0 0;
`;

const AvatarOption = styled.button<{ $isSelected?: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  max-width: 88px;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? theme.primary : "transparent"};
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
  background: ${({ theme }) => theme.surfaceElevated};
  padding: 6px;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.05);
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
  }
`;

interface AvatarSelectionModalProps {
  show: boolean;
  onHide: () => void;
  onSelect: (avatar: string) => void;
  currentAvatar?: string;
  /** Google (or linked) account photo — shown when present so users can restore it. */
  accountPhotoUrl?: string;
}

export function AvatarSelectionModal({
  show,
  onHide,
  onSelect,
  currentAvatar,
  accountPhotoUrl,
}: AvatarSelectionModalProps) {
  return (
    <WiderModal show={show} onHide={onHide} centered>
      <ModalHeader closeButton>
        <ModalTitleStack>
          <ModalHeading>
            Choose your <ModalHeadingAccent>avatar</ModalHeadingAccent>
          </ModalHeading>
        </ModalTitleStack>
      </ModalHeader>
      <ModalBody>
        {accountPhotoUrl ? (
          <AccountPhotoBlock>
            <AccountPhotoButton
              type="button"
              $isSelected={currentAvatar === accountPhotoUrl}
              onClick={() => {
                onSelect(accountPhotoUrl);
                onHide();
              }}
              aria-label="Use Google account profile photo"
            >
              <img src={accountPhotoUrl} alt="" referrerPolicy="no-referrer" />
              <AccountPhotoText>
                <strong>Use Google account photo</strong>
                <span>
                  Restore the picture from your Google sign-in (updates when you
                  sign in with Google).
                </span>
              </AccountPhotoText>
            </AccountPhotoButton>
          </AccountPhotoBlock>
        ) : null}
        <AvatarGrid>
          {AVATAR_OPTIONS.map((avatar: string, index: number) => (
            <AvatarOption
              key={index}
              type="button"
              $isSelected={avatar === currentAvatar}
              onClick={() => {
                onSelect(avatar);
                onHide();
              }}
              aria-label={`Avatar option ${index + 1}`}
            >
              <img src={avatar} alt="" />
            </AvatarOption>
          ))}
        </AvatarGrid>
      </ModalBody>
    </WiderModal>
  );
}
