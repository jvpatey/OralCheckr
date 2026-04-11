import styled from "styled-components";
import { Modal } from "react-bootstrap";

// Modern glassmorphic modal styling
export const StyledModal = styled(Modal)`
  padding: 20px;

  /* Reposition modal to avoid cutoff */
  .modal-dialog {
    margin-top: 80px;
    margin-bottom: 40px;
  }

  .modal-content {
    /* Glassmorphism background */
    background: ${({ theme }) => theme.glassBg};
    backdrop-filter: blur(${({ theme }) => theme.glassBlur});
    -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});

    border: 1px solid ${({ theme }) => theme.borderLight};
    border-radius: 20px;
    box-shadow: ${({ theme }) => theme.shadowXl};
    overflow: hidden;
  }

  .modal-header {
    border: none;
    padding: 24px 24px 16px 24px;
    background: transparent;

    .modal-title {
      background: ${({ theme }) => theme.primaryGradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 1.75rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .btn-close {
      background: ${({ theme }) => theme.glassBg};
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid ${({ theme }) => theme.borderLight};
      border-radius: 12px;
      width: 36px;
      height: 36px;
      opacity: 1;
      position: relative;
      padding: 0;

      /* Ensure the X icon is visible */
      &::before {
        content: "×";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
        font-weight: 600;
        color: ${({ theme }) => theme.textPrimary};
        line-height: 1;
      }

      /* Hide the default Bootstrap close icon */
      background-image: none !important;

      &:hover {
        background: ${({ theme }) => theme.error}20;
        border-color: ${({ theme }) => theme.error}40;

        &::before {
          color: ${({ theme }) => theme.error};
        }
      }

      &:focus {
        box-shadow: 0 0 0 3px ${({ theme }) => theme.error}20;
        outline: none;
      }
    }
  }

  .modal-body {
    color: ${({ theme }) => theme.textPrimary};
    font-size: 1rem;
    padding: 0 24px 16px 24px;
    background: transparent;
  }

  .modal-footer {
    border: none;
    padding: 16px 24px 24px 24px;
    background: transparent;
    gap: 12px;
    justify-content: flex-end;
  }
`;
