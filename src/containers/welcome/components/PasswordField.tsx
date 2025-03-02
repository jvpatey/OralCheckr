import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  InputStyle,
  PasswordContainer,
  PasswordToggle,
  InfoIcon,
  RequirementList,
  RequirementItem,
} from "../styles/ModalStyles";
import { passwordRequirements } from "../utils/password-utils";

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showRequirements?: boolean;
  autoComplete?: string;
  id?: string;
}

export function PasswordField({
  value,
  onChange,
  placeholder = "Enter password",
  showRequirements = false,
  autoComplete = "current-password",
  id = "formPassword",
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkPasswordRequirements = (password: string) => {
    return passwordRequirements.map((req) => ({
      message: req.message,
      isMet: req.regex.test(password),
    }));
  };

  // Password requirements popover
  const passwordRequirementsPopover = (
    <Popover id="password-requirements-popover">
      <Popover.Header as="h3">Password Requirements</Popover.Header>
      <Popover.Body>
        <RequirementList>
          {checkPasswordRequirements(value).map((req, index) => (
            <RequirementItem key={index} $isMet={req.isMet}>
              {req.message}
            </RequirementItem>
          ))}
        </RequirementList>
      </Popover.Body>
    </Popover>
  );

  return (
    <PasswordContainer>
      <InputStyle
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        title={
          showRequirements
            ? "Hover over the info icon to see password requirements"
            : undefined
        }
      />
      {showRequirements && (
        <OverlayTrigger
          trigger={["hover", "focus"]}
          placement="left"
          overlay={passwordRequirementsPopover}
        >
          <InfoIcon>
            <FontAwesomeIcon icon={faInfoCircle} />
          </InfoIcon>
        </OverlayTrigger>
      )}
      <PasswordToggle onClick={togglePasswordVisibility}>
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </PasswordToggle>
    </PasswordContainer>
  );
}
