import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { PageBackground } from "../../../components/PageBackground";
import { ToggleButton } from "../../../components/habit-tracker/analytics/ToggleButton";
import { MonthView } from "./month-view/MonthView";
import { YearView } from "./year-view/YearView";
import { Habit } from "../../../services/habitService";
import { useFetchHabits } from "../../../hooks/habits";
import { useHabitLogsForAllHabits } from "../../../hooks/habitLogs";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useHabitContext } from "../../../contexts/HabitContext";
import { LoadingComponent } from "../../../components/habit-tracker/analytics/LoadingComponent";
import {
  AnalyticsContentScroll,
  NoHabitMessage,
} from "../../../components/habit-tracker/analytics/styles/SharedAnalyticsStyles";
import { HabitDropdown } from "./HabitDropdown";
import {
  CardContainer,
  HabitHeroEyebrow,
  HabitListContainer,
  HabitWrapper,
  Header,
  HeaderMainRow,
  HeaderSubtitle,
  HeaderText,
  HeaderTitleColumn,
} from "../../../components/habit-tracker/habits/HabitComponents";
import { HeroTitleAccent } from "../../welcome/styles/WelcomeStyles";

// Enum for view modes
enum ViewMode {
  MONTH = "month",
  YEAR = "year",
}

// Define the Logging type to match the structure from the database
export type Logging = Record<
  string,
  Record<number, Record<string, Record<number, number>>>
>;

// Local timezone
const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Helper function to transform habitLogsMap
const transformHabitLogsToAnalyticsFormat = (
  habits: Habit[],
  habitLogsMap: Record<number, Record<string, number>>,
): Logging => {
  const result: Logging = {};

  habits.forEach((habit) => {
    if (!habit.habitId) return;

    const habitId = habit.habitId;
    const habitName = habit.name;

    if (!result[habitName]) {
      result[habitName] = {};
    }

    const logs = habitLogsMap[habitId] || {};

    Object.entries(logs).forEach(([dateStr, count]) => {
      try {
        const date = new Date(dateStr + "T00:00:00");
        const zonedDate = toZonedTime(date, TIMEZONE);

        const y = zonedDate.getFullYear();
        const month = format(zonedDate, "MMMM").toLowerCase();
        const day = zonedDate.getDate();

        if (!result[habitName][y]) {
          result[habitName][y] = {};
        }

        if (!result[habitName][y][month]) {
          result[habitName][y][month] = {};
        }

        result[habitName][y][month][day] = count;
      } catch (error) {
        console.error(`Error processing date: ${dateStr}`, error);
      }
    });
  });

  return result;
};

const toggleOptions = [
  { label: "Monthly", value: ViewMode.MONTH },
  { label: "Yearly", value: ViewMode.YEAR },
];

/* Top-align toggle with title stack — HeaderMainRow defaults to flex-end (baseline with subtitle). */
const AnalyticsHeaderMainRow = styled(HeaderMainRow)`
  flex-wrap: wrap;
  row-gap: 0.75rem;
  align-items: flex-start;
`;

/** Toggle + habit selector: same width (min/max as outline dropdown), stacked. */
const AnalyticsHeaderControlsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.625rem;
  width: max-content;
  min-width: 180px;
  max-width: min(280px, 100%);
  flex-shrink: 0;
  align-self: flex-start;
  margin-left: auto;
  box-sizing: border-box;

  .dropdown {
    display: block;
    width: 100%;
  }

  @media (max-width: 720px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    margin-left: 0;
  }
`;

const SubtitleForWord = styled.span`
  color: ${({ theme }) => theme.textPrimary};
  font-size: inherit;
  font-weight: 400;
  line-height: inherit;
`;

const SubtitleHabitName = styled.span`
  color: ${({ theme }) => theme.blue};
  font-weight: 600;
`;

// The main functional component for the Analytics page of the habit tracker
export function Analytics() {
  const [view, setView] = useState<ViewMode>(ViewMode.MONTH);
  const { selectedHabit, setSelectedHabit } = useHabitContext();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const month = format(selectedDate, "MMMM");
  const year = selectedDate.getFullYear();

  const {
    data: habits = [],
    isLoading: isLoadingHabits,
    error: habitsError,
  } = useFetchHabits();

  const habitIds = useMemo(
    () => habits.map((h) => h.habitId).filter(Boolean) as number[],
    [habits],
  );

  const {
    habitLogsMap: monthLogsMap,
    isLoading: isLoadingMonthLogs,
    isError: isMonthLogsError,
  } = useHabitLogsForAllHabits(habitIds, year, month);

  const {
    habitLogsMap: yearLogsMap,
    isLoading: isLoadingYearLogs,
    isError: isYearLogsError,
  } = useHabitLogsForAllHabits(habitIds, year, "");

  const habitsLog = useMemo(() => {
    const logsMap = view === ViewMode.MONTH ? monthLogsMap : yearLogsMap;
    return transformHabitLogsToAnalyticsFormat(habits, logsMap);
  }, [habits, monthLogsMap, yearLogsMap, view]);

  const isLoading =
    isLoadingHabits ||
    (view === ViewMode.MONTH ? isLoadingMonthLogs : isLoadingYearLogs);
  const isError =
    habitsError ||
    (view === ViewMode.MONTH ? isMonthLogsError : isYearLogsError);

  useEffect(() => {
    if (!selectedHabit && habits.length > 0) {
      setSelectedHabit(habits[0].name);
    } else if (
      selectedHabit &&
      !habits.some((habit) => habit.name === selectedHabit) &&
      habits.length > 0
    ) {
      setSelectedHabit(habits[0].name);
    }
  }, [habits, selectedHabit, setSelectedHabit]);

  const handleSelectHabit = (habitName: string) => {
    setSelectedHabit(habitName);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const headerSubtitleYear = `${year} · Year-at-a-glance heatmap`;

  if (isLoading) {
    return (
      <PageBackground>
        <HabitListContainer>
          <CardContainer>
            <HabitWrapper>
              <Header>
                <HeaderMainRow>
                  <HeaderTitleColumn>
                    <HabitHeroEyebrow>Analyze</HabitHeroEyebrow>
                    <HeaderText>
                      Habit{" "}
                      <HeroTitleAccent as="span">Analytics</HeroTitleAccent>
                    </HeaderText>
                    <HeaderSubtitle>Loading your data…</HeaderSubtitle>
                  </HeaderTitleColumn>
                </HeaderMainRow>
              </Header>
              <LoadingComponent />
            </HabitWrapper>
          </CardContainer>
        </HabitListContainer>
      </PageBackground>
    );
  }

  if (isError) {
    return (
      <PageBackground>
        <HabitListContainer>
          <CardContainer>
            <HabitWrapper>
              <Header>
                <HeaderMainRow>
                  <HeaderTitleColumn>
                    <HabitHeroEyebrow>Analyze</HabitHeroEyebrow>
                    <HeaderText>
                      Habit{" "}
                      <HeroTitleAccent as="span">Analytics</HeroTitleAccent>
                    </HeaderText>
                    <HeaderSubtitle>
                      Something went wrong while loading this page.
                    </HeaderSubtitle>
                  </HeaderTitleColumn>
                </HeaderMainRow>
              </Header>
              <NoHabitMessage style={{ marginTop: 0 }}>
                Error loading analytics data. Please try again later.
              </NoHabitMessage>
            </HabitWrapper>
          </CardContainer>
        </HabitListContainer>
      </PageBackground>
    );
  }

  return (
    <PageBackground>
      <HabitListContainer>
        <CardContainer>
          <HabitWrapper>
            <Header>
              <AnalyticsHeaderMainRow>
                <HeaderTitleColumn>
                  <HabitHeroEyebrow>Analyze</HabitHeroEyebrow>
                  <HeaderText>
                    {view === ViewMode.MONTH ? (
                      <>
                        Monthly Habit{" "}
                        <HeroTitleAccent as="span">Analytics</HeroTitleAccent>
                      </>
                    ) : (
                      <>
                        Yearly Habit{" "}
                        <HeroTitleAccent as="span">Analytics</HeroTitleAccent>
                      </>
                    )}
                  </HeaderText>
                  <HeaderSubtitle>
                    {view === ViewMode.MONTH ? (
                      <>
                        {format(selectedDate, "MMMM yyyy")} · Daily completion
                        and trends
                        {selectedHabit ? (
                          <>
                            {" "}
                            <SubtitleForWord>for </SubtitleForWord>
                            <SubtitleHabitName>{selectedHabit}</SubtitleHabitName>
                          </>
                        ) : null}
                      </>
                    ) : (
                      headerSubtitleYear
                    )}
                  </HeaderSubtitle>
                </HeaderTitleColumn>
                <AnalyticsHeaderControlsColumn>
                  <ToggleButton
                    embedded
                    align="end"
                    options={toggleOptions}
                    activeValue={view}
                    onChange={(newView) => setView(newView as ViewMode)}
                  />
                  <HabitDropdown
                    habits={habits}
                    onSelectHabit={handleSelectHabit}
                    variant="outline"
                    fullWidth
                  />
                </AnalyticsHeaderControlsColumn>
              </AnalyticsHeaderMainRow>
            </Header>

            <AnalyticsContentScroll>
              {view === ViewMode.MONTH ? (
                <MonthView
                  habits={habits}
                  habitsLog={habitsLog}
                  hideAnalytics={!selectedHabit}
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                  isLoading={isLoadingMonthLogs}
                />
              ) : (
                <YearView
                  habitsLog={habitsLog}
                  hideAnalytics={!selectedHabit}
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                />
              )}
              {!selectedHabit && (
                <NoHabitMessage>
                  Please select a habit to display analytics.
                </NoHabitMessage>
              )}
            </AnalyticsContentScroll>
          </HabitWrapper>
        </CardContainer>
      </HabitListContainer>
    </PageBackground>
  );
}
