import { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { colors } from "../../../common/utilities/color-utils";
import "react-datepicker/dist/react-datepicker.css";

interface MonthPickerProps {
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

// Styled component for the Month Picker container
const MonthPickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

const MonthPickerButton = styled.button`
  background-color: ${colors.bgWhite};
  color: ${colors.blue};
  border: 2px solid ${colors.blue};
  padding: 0 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  height: 45px;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-bottom: 5px;
  margin-left: 10px;

  &:hover {
    background-color: ${colors.blue};
    color: ${colors.bgWhite};
  }
`;

export function MonthPicker({
  selectedMonth,
  onMonthChange,
}: MonthPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMonthChange = (date: Date | null) => {
    if (date) {
      onMonthChange(date);
    }
    setIsOpen(false);
  };

  return (
    <MonthPickerContainer>
      <DatePicker
        selected={selectedMonth}
        onChange={handleMonthChange}
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        showPopperArrow={false}
        open={isOpen}
        onClickOutside={() => setIsOpen(false)}
        customInput={
          <MonthPickerButton onClick={() => setIsOpen(!isOpen)}>
            {selectedMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </MonthPickerButton>
        }
      />
    </MonthPickerContainer>
  );
}
