import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  InputStyle,
  PasswordContainer,
  PasswordToggle,
  InfoIcon,
} from "../styles/ModalStyles";
import { CustomPasswordTooltip } from "./CustomPasswordTooltip";

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showRequirements?: boolean;
  autoComplete?: string;
  id?: string;
  required?: boolean;
}

export function PasswordField({
  value,
  onChange,
  placeholder = "Enter password",
  showRequirements = false,
  autoComplete = "current-password",
  id = "formPassword",
  required = false,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInfoHover = (isHovering: boolean) => {
    setShowTooltip(isHovering);
  };

  return (
    <PasswordContainer>
      <InputStyle
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        title={
          showRequirements
            ? "Hover over the info icon to see password requirements"
            : undefined
        }
      />
      {showRequirements && (
        <InfoIcon
          onMouseEnter={() => handleInfoHover(true)}
          onMouseLeave={() => handleInfoHover(false)}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          <CustomPasswordTooltip show={showTooltip} password={value} />
        </InfoIcon>
      )}
      <PasswordToggle onClick={togglePasswordVisibility}>
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </PasswordToggle>
    </PasswordContainer>
  );
}
