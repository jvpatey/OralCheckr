import styled from "styled-components";
import { Modal } from "react-bootstrap";

// Styled component to style the Questionnaire modal
export const StyledModal = styled(Modal)`
  padding: 10px;

  .modal-content {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    border: 1px solid ${({ theme }) => theme.accentBackgroundColor};
  }

  .modal-header,
  .modal-footer {
    border: none;
  }

  .modal-title {
    color: ${({ theme }) => theme.blue};
    font-size: 1.5rem;
  }

  .modal-body {
    color: ${({ theme }) => theme.textGrey};
    font-size: 1.2rem;
  }
`;
