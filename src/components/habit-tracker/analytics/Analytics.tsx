import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { PageBackground } from "../../PageBackground";
import { MonthView } from "./MonthView";
import { YearView } from "./YearView";
import { ToggleButton } from "./ToggleButton";

export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnalyticsContainer = styled.div`
  width: calc(100% - 190px);
  height: calc(100vh - 56px);
  overflow-y: auto;
  position: absolute;
  top: 56px;
  left: 190px;
  padding: 20px;
  box-sizing: border-box;
  animation: ${fadeUp} 1s ease-out;

  @media (max-width: 768px) {
    width: calc(100% - 70px);
    left: 70px;
  }

  @media (max-width: 768px) {
    width: calc(100% - 70px);
    left: 70px;
  }
`;

export function Analytics() {
  const [view, setView] = useState("month");

  const toggleOptions = [
    { label: "Month View", value: "month" },
    { label: "Year View", value: "year" },
  ];

  return (
    <PageBackground>
      <AnalyticsContainer>
        <ToggleButton
          options={toggleOptions}
          activeValue={view}
          onChange={setView}
        />

        {view === "month" ? <MonthView /> : <YearView />}
      </AnalyticsContainer>
    </PageBackground>
  );
}
