import { forwardRef, useRef } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import {
  DatePickerContainer,
  AnalyticsDateTriggerButton,
  AnalyticsChevronButton,
} from "../../../components/habit-tracker/analytics/styles/DateSelectorStyles";
import { HeroTitleAccent } from "../../welcome/styles/WelcomeStyles";

const StyledDatePickerWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  min-width: 0;

  .react-datepicker {
    background: ${({ theme }) => theme.glassBg} !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border: 1px solid ${({ theme }) => `${theme.primary}45`} !important;
    border-radius: 16px !important;
    box-shadow: none !important;
    padding: 6px !important;
    font-family: var(--font-sans), system-ui, sans-serif !important;
    min-width: 200px !important;
    max-width: 280px !important;
  }

  .react-datepicker__header {
    background: transparent !important;
    border-bottom: 1px solid ${({ theme }) => `${theme.primary}30`} !important;
    padding: 0 0 10px 0 !important;
    margin-bottom: 10px !important;
  }

  .react-datepicker__current-month {
    color: ${({ theme }) => theme.textPrimary} !important;
    font-weight: 600 !important;
    font-size: 0.875rem !important;
    letter-spacing: -0.02em !important;
    margin-bottom: 6px !important;
  }

  .react-datepicker__navigation {
    background: transparent !important;
    border: 1px solid ${({ theme }) => `${theme.primary}45`} !important;
    border-radius: 9999px !important;
    width: 28px !important;
    height: 28px !important;
    top: 6px !important;
    transition: border-color 0.25s ease, box-shadow 0.25s ease !important;

    &:hover {
      border-color: ${({ theme }) => `${theme.primary}65`} !important;
      box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset !important;
    }

    &::before {
      border-color: ${({ theme }) => theme.primary} !important;
      border-width: 2px 2px 0 0 !important;
    }
  }

  .react-datepicker__navigation--previous {
    left: 6px !important;
  }

  .react-datepicker__navigation--next {
    right: 6px !important;
  }

  .react-datepicker__month {
    margin: 0 !important;
  }

  .react-datepicker__month-text {
    color: ${({ theme }) => theme.textSecondary} !important;
    font-weight: 500 !important;
    font-size: 0.8125rem !important;
    padding: 8px 10px !important;
    margin: 2px !important;
    border-radius: 9999px !important;
    transition: all 0.2s ease !important;
    border: 1px solid transparent !important;
    min-width: 56px !important;
    text-align: center !important;

    &:hover {
      background: ${({ theme }) => `${theme.primary}0d`} !important;
      color: ${({ theme }) => theme.primary} !important;
      box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset !important;
    }
  }

  .react-datepicker__month-text--selected {
    background: ${({ theme }) => `${theme.primary}0d`} !important;
    color: ${({ theme }) => theme.primary} !important;
    font-weight: 600 !important;
    border: 1px solid ${({ theme }) => `${theme.primary}45`} !important;
    box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset !important;

    &:hover {
      background: ${({ theme }) => `${theme.primary}14`} !important;
    }
  }

  .react-datepicker__year-text {
    color: ${({ theme }) => theme.textSecondary} !important;
    font-weight: 500 !important;
    font-size: 0.8125rem !important;
    padding: 8px 12px !important;
    margin: 2px !important;
    border-radius: 9999px !important;
    transition: all 0.2s ease !important;
    border: 1px solid transparent !important;
    min-width: 56px !important;
    text-align: center !important;

    &:hover {
      background: ${({ theme }) => `${theme.primary}0d`} !important;
      color: ${({ theme }) => theme.primary} !important;
      box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset !important;
    }
  }

  .react-datepicker__year-text--selected {
    background: ${({ theme }) => `${theme.primary}0d`} !important;
    color: ${({ theme }) => theme.primary} !important;
    font-weight: 600 !important;
    border: 1px solid ${({ theme }) => `${theme.primary}45`} !important;
    box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset !important;

    &:hover {
      background: ${({ theme }) => `${theme.primary}14`} !important;
    }
  }

  .react-datepicker__triangle {
    display: none !important;
  }
`;

export enum ViewType {
  MONTH = "month",
  YEAR = "year",
}

interface AnalyticsDatePickerTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  viewType: ViewType;
  selectedDate: Date;
}

const AnalyticsDatePickerTrigger = forwardRef<
  HTMLButtonElement,
  AnalyticsDatePickerTriggerProps
>(function AnalyticsDatePickerTrigger(
  { viewType, selectedDate, onClick, type = "button", ...rest },
  ref,
) {
  const monthName = selectedDate.toLocaleDateString("en", { month: "long" });
  const year = selectedDate.getFullYear();

  return (
    <AnalyticsDateTriggerButton ref={ref} type={type} onClick={onClick} {...rest}>
      {viewType === ViewType.MONTH ? (
        <>
          <span>{monthName}</span>
          <HeroTitleAccent as="span">{year}</HeroTitleAccent>
        </>
      ) : (
        <HeroTitleAccent as="span">{year}</HeroTitleAccent>
      )}
    </AnalyticsDateTriggerButton>
  );
});

interface AnalyticsDateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  viewType: ViewType;
}

export function AnalyticsDateSelector({
  selectedDate,
  onDateChange,
  viewType,
}: AnalyticsDateSelectorProps) {
  const datePickerRef = useRef<DatePicker>(null);
  const today = new Date();

  const handleDateChange = (date: Date | null) => {
    if (date) {
      onDateChange(date);
    }
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };

  const decreaseDate = () => {
    const newDate =
      viewType === ViewType.MONTH
        ? new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
        : new Date(selectedDate.getFullYear() - 1, selectedDate.getMonth(), 1);
    onDateChange(newDate);
  };

  const isNextDisabled =
    (viewType === ViewType.MONTH &&
      selectedDate.getFullYear() === today.getFullYear() &&
      selectedDate.getMonth() === today.getMonth()) ||
    (viewType === ViewType.YEAR &&
      selectedDate.getFullYear() === today.getFullYear());

  const increaseDate = () => {
    if (isNextDisabled) return;

    const newDate =
      viewType === ViewType.MONTH
        ? new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
        : new Date(selectedDate.getFullYear() + 1, selectedDate.getMonth(), 1);
    onDateChange(newDate);
  };

  const handleButtonClick = () => {
    datePickerRef.current?.setOpen(true);
  };

  return (
    <DatePickerContainer>
      <AnalyticsChevronButton
        type="button"
        onClick={decreaseDate}
        aria-label="Previous period"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </AnalyticsChevronButton>
      <StyledDatePickerWrapper>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat={viewType === ViewType.MONTH ? "MMMM yyyy" : "yyyy"}
          showYearPicker={viewType === ViewType.YEAR}
          showMonthYearPicker={viewType === ViewType.MONTH}
          showPopperArrow={false}
          ref={datePickerRef}
          maxDate={today}
          onClickOutside={() => datePickerRef.current?.setOpen(false)}
          customInput={
            <AnalyticsDatePickerTrigger
              viewType={viewType}
              selectedDate={selectedDate}
              onClick={handleButtonClick}
            />
          }
        />
      </StyledDatePickerWrapper>
      <AnalyticsChevronButton
        type="button"
        onClick={increaseDate}
        disabled={isNextDisabled}
        $disabled={isNextDisabled}
        aria-label="Next period"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </AnalyticsChevronButton>
    </DatePickerContainer>
  );
}
