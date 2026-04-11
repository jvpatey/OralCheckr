import React from "react";

// Creates a handler for range input changes

export const createRangeChangeHandler = (
  id: number,
  setRangeValue: React.Dispatch<React.SetStateAction<number | null>>,
  onResponseChange: (questionId: number, response: number | number[]) => void
) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value) + 1;
    setRangeValue(value);
    onResponseChange(id, value);
  };
};

// Creates a handler for radio input changes

export const createRadioChangeHandler = (
  id: number,
  setRangeValue: React.Dispatch<React.SetStateAction<number | null>>,
  onResponseChange: (questionId: number, response: number | number[]) => void
) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setRangeValue(value);
    onResponseChange(id, value);
  };
};

// Creates a handler for checkbox input changes

export const createCheckboxChangeHandler = (
  id: number,
  selectedOptions: number[],
  setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>,
  onResponseChange: (questionId: number, response: number | number[]) => void
) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const newSelectedOptions = event.target.checked
      ? [...selectedOptions, value]
      : selectedOptions.filter((option) => option !== value);
    setSelectedOptions(newSelectedOptions);
    onResponseChange(id, newSelectedOptions);
  };
};
