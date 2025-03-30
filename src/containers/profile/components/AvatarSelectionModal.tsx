import { Modal } from "react-bootstrap";
import {
  StyledModalHeader,
  StyledModalBody,
  AvatarGrid,
  AvatarOption,
} from "../styles/AvatarSelectionModalStyles";
import { AVATAR_OPTIONS } from "../constants/avatarOptions";

interface AvatarSelectionModalProps {
  show: boolean;
  onHide: () => void;
  onSelect: (avatar: string) => void;
  currentAvatar?: string;
}

// Modal component for selecting an avatar
export function AvatarSelectionModal({
  show,
  onHide,
  onSelect,
  currentAvatar,
}: AvatarSelectionModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <StyledModalHeader closeButton>
        <Modal.Title>Choose Your Avatar</Modal.Title>
      </StyledModalHeader>
      <StyledModalBody>
        <AvatarGrid>
          {AVATAR_OPTIONS.map((avatar, index) => (
            <AvatarOption
              key={index}
              $isSelected={avatar === currentAvatar}
              onClick={() => {
                onSelect(avatar);
                onHide();
              }}
            >
              <img src={avatar} alt={`Avatar option ${index + 1}`} />
            </AvatarOption>
          ))}
        </AvatarGrid>
      </StyledModalBody>
    </Modal>
  );
}
