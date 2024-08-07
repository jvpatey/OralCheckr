import styled from "styled-components";
import { Modal } from "react-bootstrap";

export const StyledModal = styled(Modal)`
  padding: 10px;

  .modal-content {
    background-color: #f5f5f5;
    border: 1px solid #f5f5f5;
  }

  .modal-header,
  .modal-footer {
    border: none;
  }

  .modal-title {
    color: #07889b;
    font-size: 1.5rem;
  }

  .modal-body {
    color: #222831;
    font-size: 1.2rem;
  }
`;
