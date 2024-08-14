import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { colors } from "../../common/color-utils";

export const StyledModal = styled(Modal)`
  padding: 10px;

  .modal-content {
    background-color: ${colors.bgWhite};
    border: 1px solid ${colors.bgWhite};
  }

  .modal-header,
  .modal-footer {
    border: none;
  }

  .modal-title {
    color: ${colors.blue};
    font-size: 1.5rem;
  }

  .modal-body {
    color: ${colors.textGrey};
    font-size: 1.2rem;
  }
`;
