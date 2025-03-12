import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IconButtonContainer, IconContainer } from "./styles/ButtonStyles";

interface IconButtonProps {
  icon: IconDefinition;
  onClick: () => void;
  borderColor: string;
  color: string;
  hoverBackgroundColor: string;
  disabled?: boolean;
}

// Functional component for the common icon button (log, remove log, edit, and delete buttons) - used in the Habits component
export function IconButton({
  icon,
  onClick,
  borderColor,
  color,
  hoverBackgroundColor,
  disabled = false,
}: IconButtonProps) {
  // handler that only calls onClick if not disabled
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <IconButtonContainer
      onClick={handleClick}
      $disabled={disabled}
      $borderColor={borderColor}
      $color={color}
      $hoverBackgroundColor={hoverBackgroundColor}
    >
      <IconContainer>
        <FontAwesomeIcon icon={icon} />
      </IconContainer>
    </IconButtonContainer>
  );
}
