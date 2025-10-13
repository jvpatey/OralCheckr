import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContentWrapper } from "../styles/ToastStyles";

// Toast types
type ToastType = "success" | "error" | "warning" | "info";

// Icon mapping for different toast types
const toastIcons = {
  success: faCheckCircle,
  error: faTimesCircle,
  warning: faExclamationTriangle,
  info: faInfoCircle,
};

// Toast color themes
const toastThemes = {
  success: {
    icon: "#10b981",
    accent: "#059669",
  },
  error: {
    icon: "#ef4444",
    accent: "#dc2626",
  },
  warning: {
    icon: "#f59e0b",
    accent: "#d97706",
  },
  info: {
    icon: "#3b82f6",
    accent: "#2563eb",
  },
};

// Create a modern toast with icon and proper styling
export const createModernToast = (
  type: ToastType,
  title: string,
  message?: string
) => {
  const icon = toastIcons[type];
  const theme = toastThemes[type];

  const toastContent = (
    <ToastContentWrapper $type={type}>
      <FontAwesomeIcon
        icon={icon}
        className="toast-icon"
        style={{ color: theme.icon }}
      />
      <div className="toast-content">
        <div className="toast-title">{title}</div>
        {message && <div className="toast-message">{message}</div>}
      </div>
    </ToastContentWrapper>
  );

  return toast(toastContent, {
    type: type,
    position: "top-right",
    autoClose: type === "error" ? 5000 : 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "modern-toast",
  });
};

// Convenience functions for each toast type
export const showSuccessToast = (title: string, message?: string) => {
  return createModernToast("success", title, message);
};

export const showErrorToast = (title: string, message?: string) => {
  return createModernToast("error", title, message);
};

export const showWarningToast = (title: string, message?: string) => {
  return createModernToast("warning", title, message);
};

export const showInfoToast = (title: string, message?: string) => {
  return createModernToast("info", title, message);
};

// Default toast function with auto-detection
export const showToast = (type: ToastType, title: string, message?: string) => {
  switch (type) {
    case "success":
      return showSuccessToast(title, message);
    case "error":
      return showErrorToast(title, message);
    case "warning":
      return showWarningToast(title, message);
    case "info":
      return showInfoToast(title, message);
    default:
      return showInfoToast(title, message);
  }
};

// Promise-based toast for async operations
export const showPromiseToast = <T,>(
  promise: Promise<T>,
  {
    pending = "Loading...",
    success = "Success!",
    error = "Something went wrong",
  }: {
    pending?: string;
    success?: string;
    error?: string;
  }
) => {
  return toast.promise(
    promise,
    {
      pending: {
        render: (
          <ToastContentWrapper $type="info">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="toast-icon"
              style={{ color: toastThemes.info.icon }}
            />
            <div className="toast-content">
              <div className="toast-title">{pending}</div>
            </div>
          </ToastContentWrapper>
        ),
      },
      success: {
        render: (
          <ToastContentWrapper $type="success">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="toast-icon"
              style={{ color: toastThemes.success.icon }}
            />
            <div className="toast-content">
              <div className="toast-title">{success}</div>
            </div>
          </ToastContentWrapper>
        ),
      },
      error: {
        render: (
          <ToastContentWrapper $type="error">
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="toast-icon"
              style={{ color: toastThemes.error.icon }}
            />
            <div className="toast-content">
              <div className="toast-title">{error}</div>
            </div>
          </ToastContentWrapper>
        ),
      },
    },
    {
      className: "modern-toast",
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    }
  );
};
