import { useState, useEffect, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import {
  TileContainer,
  FlipCard,
  FlipCardFront,
  FlipCardBack,
  HabitName,
  ArrowIconWrapper,
  BackText,
  LogCountBubble,
  ProgressBar,
} from "./styles/HabitTileStyles";

interface HabitTileProps {
  habit: {
    name: string;
    count: number;
  };
  logCount: number;
}

// Functional component to render the tile that stores the habit name, count, and logs - used in the Habits component
const HabitTile = memo(({ habit, logCount }: HabitTileProps) => {
  const [flipped, setFlipped] = useState(false);
  const [displayedLogCount, setDisplayedLogCount] = useState(logCount);

  // Update the displayed log count when the prop changes
  useEffect(() => {
    setDisplayedLogCount(logCount);
  }, [logCount]);

  // Calculate the progress as a percentage
  const progress = Math.min((displayedLogCount / habit.count) * 100, 100);

  // Determine if the habit is complete
  const isComplete = displayedLogCount >= habit.count;

  // Handler for flipping the card
  const handleFlip = () => setFlipped(!flipped);

  return (
    <TileContainer onClick={handleFlip}>
      <FlipCard $flipped={flipped}>
        <FlipCardFront $isComplete={isComplete}>
          <ProgressBar $progress={progress} $isComplete={isComplete} />
          <HabitName>{habit.name}</HabitName>
          <LogCountBubble>{displayedLogCount}</LogCountBubble>
          <ArrowIconWrapper className="arrow-icon">
            <FontAwesomeIcon icon={faSync} />
          </ArrowIconWrapper>
        </FlipCardFront>
        <FlipCardBack $isComplete={isComplete}>
          <BackText>
            <div className="label spaced">
              Habit Name: <span className="value">{habit.name}</span>
            </div>
            <div className="label">
              Daily Goal: <span className="value">{habit.count}</span>
            </div>
          </BackText>
          <LogCountBubble>{displayedLogCount}</LogCountBubble>
          <ArrowIconWrapper className="arrow-icon">
            <FontAwesomeIcon icon={faSync} />
          </ArrowIconWrapper>
        </FlipCardBack>
      </FlipCard>
    </TileContainer>
  );
});

// Export the memoized component
export { HabitTile };
