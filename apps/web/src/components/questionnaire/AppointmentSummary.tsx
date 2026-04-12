import { useCallback, useContext } from "react";
import { PageBackground } from "../PageBackground";
import { LandingContainer } from "../landing/LandingContainer";
import {
  BackgroundEffects,
  HeroTitleAccent,
} from "../../containers/welcome/styles/WelcomeStyles";
import {
  QuestionnairePageShell,
  QuestionnaireStackHeader,
} from "./styles/QuestionnaireFlowLayout";
import {
  HeaderMainRow,
  HeaderTitleColumn,
  HabitHeroEyebrow,
  HeaderText,
  HeaderSubtitle,
} from "../habit-tracker/habits/HabitComponents";
import { AuthContext } from "../../containers/authentication/AuthContext";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { useAppointmentSummaryData } from "../../hooks/questionnaire/useAppointmentSummaryData";
import { RoutePaths } from "../../common/constants/routes";
import {
  SummaryRoot,
  PrintHeaderBlock,
  PrintEyebrow,
  PrintTitleLine,
  PrintTitleAccent,
  PrintSubtitle,
  PrintMeta,
  Section,
  SectionTitle,
  ScoreBlock,
  ScoreValue,
  ScoreLabel,
  MutedLine,
  QuestionnaireOverviewTable,
  OverviewRow,
  AdherenceTable,
  AdherenceRow,
  EmptyNote,
  ActionRow,
  PrintButton,
  BackLink,
} from "./styles/AppointmentSummaryStyles";

export function AppointmentSummary() {
  const { isAuthenticated } = useContext(AuthContext);
  const {
    score,
    lastCompleted,
    hasNoQuestionnaire,
    questionnaireOverview,
    adherenceRows,
    patientDisplayName,
    generatedAtLabel,
    isLoading,
    isError,
    error,
    habitsCount,
  } = useAppointmentSummaryData();

  const handlePrint = useCallback(() => {
    requestAnimationFrame(() => {
      window.print();
    });
  }, []);

  return (
    <PageBackground>
      <BackgroundEffects />
      <LandingContainer>
        <QuestionnairePageShell $isAuthenticated={isAuthenticated}>
          <QuestionnaireStackHeader>
            <HeaderMainRow>
              <HeaderTitleColumn style={{ textAlign: "left" }}>
                <HabitHeroEyebrow>Improve</HabitHeroEyebrow>
                <HeaderText style={{ textAlign: "left" }}>
                  Visit <HeroTitleAccent>summary</HeroTitleAccent>
                </HeaderText>
                <HeaderSubtitle style={{ textAlign: "left", maxWidth: "40rem" }}>
                  Your score, questionnaire answers, and recent habit adherence —
                  print or save as PDF for your visit.
                </HeaderSubtitle>
              </HeaderTitleColumn>
            </HeaderMainRow>
          </QuestionnaireStackHeader>

          <SummaryRoot className="appointment-summary-print-root">
            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : isError ? (
              <EmptyNote>
                {error instanceof Error
                  ? error.message
                  : "Something went wrong loading this summary."}
              </EmptyNote>
            ) : (
              <>
                <PrintHeaderBlock>
                  <PrintEyebrow>For your appointment</PrintEyebrow>
                  <PrintTitleLine>
                    Oral<PrintTitleAccent>Checkr</PrintTitleAccent>
                  </PrintTitleLine>
                  <PrintSubtitle>Oral health visit summary</PrintSubtitle>
                  <PrintMeta>
                    Generated {generatedAtLabel}
                    {patientDisplayName ? ` · ${patientDisplayName}` : ""}
                  </PrintMeta>
                </PrintHeaderBlock>

                <Section>
                  <SectionTitle>Assessment</SectionTitle>
                  {hasNoQuestionnaire ? (
                    <EmptyNote>
                      No questionnaire score on file yet. Complete the
                      questionnaire to include your oral health score here.
                    </EmptyNote>
                  ) : (
                    <ScoreBlock>
                      <ScoreValue>
                        {score != null ? score : "—"}
                      </ScoreValue>
                      <ScoreLabel>Oral health score</ScoreLabel>
                    </ScoreBlock>
                  )}
                  <MutedLine>
                    Last assessment:{" "}
                    {lastCompleted ?? "—"}
                  </MutedLine>
                </Section>

                <Section>
                  <SectionTitle>Questionnaire responses</SectionTitle>
                  {hasNoQuestionnaire || questionnaireOverview.length === 0 ? (
                    <EmptyNote>
                      No questionnaire on file. Complete the assessment to list
                      your questions and answers here.
                    </EmptyNote>
                  ) : (
                    <QuestionnaireOverviewTable>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Topic</th>
                          <th>Question</th>
                          <th>Your answer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questionnaireOverview.map((row) => (
                          <OverviewRow key={row.questionId}>
                            <td>{row.questionNumber}</td>
                            <td>{row.category ?? "—"}</td>
                            <td>{row.questionTitle}</td>
                            <td>{row.answerText}</td>
                          </OverviewRow>
                        ))}
                      </tbody>
                    </QuestionnaireOverviewTable>
                  )}
                </Section>

                <Section>
                  <SectionTitle>Habit adherence (last 4 weeks)</SectionTitle>
                  {habitsCount === 0 ? (
                    <EmptyNote>
                      No habits tracked yet. Add habits in the habit tracker to
                      show adherence here.
                    </EmptyNote>
                  ) : (
                    <AdherenceTable>
                      <thead>
                        <tr>
                          <th>Habit</th>
                          <th>Goal / day</th>
                          <th>Days met</th>
                          <th>Adherence</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adherenceRows.map((row) => (
                          <AdherenceRow key={row.habitId}>
                            <td>{row.name}</td>
                            <td>{row.goalPerDay}</td>
                            <td>
                              {row.daysMetGoal}/{row.daysInWindow}
                            </td>
                            <td>{row.percent}%</td>
                          </AdherenceRow>
                        ))}
                      </tbody>
                    </AdherenceTable>
                  )}
                </Section>

                <ActionRow className="no-print">
                  <PrintButton onClick={handlePrint}>
                    Print or save as PDF
                  </PrintButton>
                  <BackLink to={RoutePaths.RESULTS}>Back to results</BackLink>
                </ActionRow>
              </>
            )}
          </SummaryRoot>
        </QuestionnairePageShell>
      </LandingContainer>
    </PageBackground>
  );
}
