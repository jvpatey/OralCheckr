import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { Modal, Button, Form } from "react-bootstrap";
import _ from "lodash";
import { PageBackground } from "../../components/styled/PageBackground";
import { Sidebar } from "../../components/Sidebar";
import { links } from "../../common/SidebarLinks";
import { HabitTile } from "../../components/habittracker/HabitTile";
import { AddHabitTile } from "../../components/habittracker/AddHabitTile";
import { StyledModal } from "../../components/styled/Modal";
import { LogButton } from "../../components/habittracker/LogButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Styled component for the habit list container
const HabitListContainer = styled.div`
  width: calc(100% - 190px);
  height: calc(100vh - 76px);
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 56px;
  left: 190px;

  @media (max-width: 768px) {
    width: calc(100% - 70px);
    left: 70px;
  }
`;

// Wrapper for header and habit list
const HabitWrapper = styled.div`
  width: 40%;
  margin: 0 auto;
  padding: 20px 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

// Styled component for the header containing the "Add Habit" button
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

const HeaderText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #848889;
`;

// Styled component for the date controls
const DateControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

// Styled component for the date bubbles container
const DayBubbleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 30px;
`;

// Styled component for the date bubbles
const DayBubble = styled.div<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? "#3f93b2" : "#ccc")};
  color: white;
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    background-color: #3f93b2;
    transform: scale(1.05);
  }
`;

// Styled component for the list of entered habits
const HabitList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;

// Styled component for row containing the habit tile and log button
const HabitRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

// Styled component for the date picker
const CustomDatePickerInput = styled.input`
  background-color: #f5f5f5;
  border: none;
  color: #3f93b2;
  border: 2px solid #3f93b2;
  padding: 8px 12px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #3f93b2;
    color: #f5f5f5;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 3px 2px rgba(53, 122, 150, 0.5);
  }
`;

// Styled component for the arrow buttons
const ArrowButton = styled.button`
  background: none;
  border: none;
  color: #3f93b2;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #dfdfdf;
  }

  &:focus {
    outline: none;
  }
`;

// Helper function to get the start of the week for a given date
const getStartOfWeek = (date: Date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  return startOfWeek;
};

// Helper function to get an array of the days in the week
const getDaysInWeek = (startOfWeek: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push(day);
  }
  return days;
};

// Types
interface Habit {
  name: string;
  count: number;
}

export function Habits() {
  // State to store the list of habits
  const [habits, setHabits] = useState<Habit[]>([]);
  // State to store the currently selected date in the DatePicker
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // State to store the currently selected day of the week
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());

  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState<boolean>(false);

  // State to store the new habit being added or edited
  const [newHabit, setNewHabit] = useState<Habit>({
    name: "",
    count: 0,
  });

  // State to store the original habit values when editing
  const [originalHabit, setOriginalHabit] = useState<Habit>({
    name: "",
    count: 0,
  });

  // Load habits from local storage when the component mounts
  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  // Handler for showing the add habit modal
  const handleAddHabitClick = () => {
    setShowModal(true);
    resetForm();
  };

  // Reset the form fields and edit state
  const resetForm = () => {
    setNewHabit({ name: "", count: 0 });
    setOriginalHabit({ name: "", count: 0 });
  };

  // Handler for saving a new or edited habit
  const handleSaveHabit = () => {
    if (newHabit.name && newHabit.count > 0) {
      const updatedHabits = [...habits];
      const habitIndex = habits.findIndex(
        (habit) =>
          habit.name === originalHabit.name &&
          habit.count === originalHabit.count
      );
      if (habitIndex > -1) {
        updatedHabits[habitIndex] = newHabit;
      } else {
        updatedHabits.push(newHabit);
      }
      setHabits(updatedHabits);
      localStorage.setItem("habits", JSON.stringify(updatedHabits));
      setShowModal(false);
      resetForm();
    }
  };

  // Handler for closing the modal without saving
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Handler for deleting a habit
  const handleDeleteHabit = (index: number) => {
    // Filter out the deleted habit
    const updatedHabits = habits.filter((_, idx) => idx !== index);
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  // Handler for editing a habit
  const handleEditHabit = (index: number) => {
    const habitToEdit = habits[index];
    if (habitToEdit) {
      // Set the newHabit and originalHabit with the habit details being edited
      setNewHabit(habitToEdit);
      setOriginalHabit(habitToEdit);
      setShowModal(true);
    }
  };

  // Handler for habit name input change without validation
  const handleHabitNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewHabit((prev) => ({ ...prev, name: value }));
  };

  // Handler for habit count input change with validation
  const handleHabitCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (_.isNumber(Number(value))) {
      setNewHabit((prev) => ({ ...prev, count: Number(value) }));
    }
  };

  // Check if the Save button should be enabled
  const isSaveDisabled = () =>
    !newHabit.name ||
    newHabit.count <= 0 ||
    (newHabit.name === originalHabit.name &&
      newHabit.count === originalHabit.count);

  // Get the start of the week and the days in the week
  const startOfWeek = getStartOfWeek(selectedDate);
  const daysInWeek = getDaysInWeek(startOfWeek);

  // Format the week range
  const weekRange = `${startOfWeek.toLocaleDateString("en", {
    month: "short",
    day: "numeric",
  })} - ${daysInWeek[6].toLocaleDateString("en", {
    month: "short",
    day: "numeric",
  })}`;

  // Handler functions for changing the selected date
  const handlePrevWeek = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7);
      return newDate;
    });
  };

  // Inside the return statement
  return (
    <PageBackground>
      <Sidebar links={links} />
      <HabitListContainer>
        <HabitWrapper>
          <DateControlsContainer>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => {
                if (date) setSelectedDate(date);
              }}
              dateFormat="MMMM d, yyyy"
              showWeekNumbers
              customInput={<CustomDatePickerInput />}
              placeholderText={weekRange}
            />
            <DayBubbleContainer>
              <ArrowButton onClick={handlePrevWeek}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </ArrowButton>
              {daysInWeek.map((day, index) => (
                <DayBubble
                  key={index}
                  selected={index === selectedDay}
                  onClick={() => setSelectedDay(index)}
                >
                  <div>{day.getDate()}</div>
                  <div>
                    {day.toLocaleDateString("en", { weekday: "short" })[0]}
                  </div>
                </DayBubble>
              ))}
              <ArrowButton onClick={handleNextWeek}>
                <FontAwesomeIcon icon={faChevronRight} />
              </ArrowButton>
            </DayBubbleContainer>
          </DateControlsContainer>
          <Header>
            <HeaderText>My Habits:</HeaderText>
            <AddHabitTile onAddClick={handleAddHabitClick} />
          </Header>
          <HabitList>
            {habits.map((habit, index) => (
              <HabitRow key={index}>
                <HabitTile
                  habit={habit}
                  onDeleteClick={() => handleDeleteHabit(index)}
                  onEditClick={() => handleEditHabit(index)}
                />
                <LogButton />
              </HabitRow>
            ))}
          </HabitList>
        </HabitWrapper>
      </HabitListContainer>

      <StyledModal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {originalHabit.name ? "Edit a Habit" : "Add a New Habit"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="habitName">
              <Form.Label>Habit Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter habit name"
                value={newHabit.name}
                onChange={handleHabitNameChange}
              />
            </Form.Group>
            <Form.Group controlId="habitCount">
              <Form.Label style={{ marginTop: "10px" }}>
                Habit Count (times per day)
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter habit count"
                value={newHabit.count.toString()}
                onChange={handleHabitCountChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            style={{
              backgroundColor: isSaveDisabled() ? "#ccc" : "#07889b",
              borderColor: isSaveDisabled() ? "#ccc" : "#07889b",
            }}
            onClick={handleSaveHabit}
            disabled={isSaveDisabled()}
          >
            Save Habit
          </Button>
        </Modal.Footer>
      </StyledModal>
    </PageBackground>
  );
}
