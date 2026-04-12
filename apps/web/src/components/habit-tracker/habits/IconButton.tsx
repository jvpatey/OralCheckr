import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  IconButtonContainer,
  IconContainer,
  HabitIconButtonContainer,
  HabitIconInner,
} from "./styles/ButtonStyles";

type IconButtonBoldProps = {
  icon: IconDefinition;
  onClick: () => void;
  disabled?: boolean;
  look?: "bold";
  borderColor: string;
  color: string;
  hoverBackgroundColor: string;
};

type IconButtonSubtleProps = {
  icon: IconDefinition;
  onClick: () => void;
  disabled?: boolean;
  look: "subtle";
  accent: "plus" | "minus" | "edit" | "delete";
};

export type IconButtonProps = IconButtonBoldProps | IconButtonSubtleProps;

// Icon button for habit logging (subtle flanking controls) or analytics (bold)
export function IconButton(props: IconButtonProps) {
  const handleClick = () => {
    if (!props.disabled) {
      props.onClick();
    }
  };

  if (props.look === "subtle") {
    return (
      <HabitIconButtonContainer
        onClick={handleClick}
        $disabled={props.disabled}
        $accent={props.accent}
        aria-disabled={props.disabled ?? false}
      >
        <HabitIconInner>
          <FontAwesomeIcon icon={props.icon} />
        </HabitIconInner>
      </HabitIconButtonContainer>
    );
  }

  const { icon, disabled, borderColor, color, hoverBackgroundColor } = props;

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
