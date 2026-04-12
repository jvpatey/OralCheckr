import { useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { AuthContext } from "../../containers/authentication/AuthContext";
import { useFetchHabits } from "../habits";
import { useProfile } from "../profile/useProfile";
import { fetchHabitLogs } from "../../services/habitLogService";
import { parseQuestionnaireResponsesFromApi } from "../../containers/questionnaire/utils/questionnaire-response-parse";
import { buildQuestionnaireOverview } from "../../containers/questionnaire/utils/questionnaire-overview-utils";
import {
  buildHabitAdherenceForDayKeys,
  getLastNDayKeysInTimeZone,
  getMonthQueryPairsForDayKeys,
} from "../../containers/questionnaire/utils/appointment-summary-utils";
import { useQuestionnaireData } from "./useQuestionnaireData";
import { useQuestionnaireResponseQuery } from "./useQuestionnaireResponseQuery";

const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
const ADHERENCE_DAY_COUNT = 28;

function normalizeLogDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  const zonedDate = toZonedTime(dateObj, TIMEZONE);
  return format(zonedDate, "yyyy-MM-dd");
}

export function useAppointmentSummaryData() {
  const { user } = useContext(AuthContext);
  const { profile } = useProfile();
  const {
    data: questionnaireRaw,
    isLoading: questionnaireLoading,
    isError: questionnaireError,
    error: questionnaireErr,
  } = useQuestionnaireResponseQuery();
  const {
    data: questionnaireFormatted,
    isLoading: questionnaireFmtLoading,
    isError: questionnaireFmtError,
    hasNoData,
  } = useQuestionnaireData();

  const {
    data: habits = [],
    isLoading: habitsLoading,
    isError: habitsError,
    error: habitsErr,
  } = useFetchHabits();

  const todayKey = formatInTimeZone(new Date(), TIMEZONE, "yyyy-MM-dd");
  const dayKeys = getLastNDayKeysInTimeZone(
    ADHERENCE_DAY_COUNT,
    TIMEZONE,
    new Date()
  );
  const monthPairs = getMonthQueryPairsForDayKeys(dayKeys);

  const habitIds = useMemo(
    () =>
      habits
        .map((h) => h.habitId)
        .filter((id): id is number => id != null)
        .sort((a, b) => a - b),
    [habits]
  );

  const logsQuery = useQuery({
    queryKey: [
      "appointmentSummaryLogs",
      habitIds.join(","),
      monthPairs.map((m) => `${m.year}-${m.month}`).join("|"),
      todayKey,
    ],
    queryFn: async () => {
      const merged: Record<number, Record<string, number>> = {};
      for (const id of habitIds) {
        merged[id] = {};
      }
      for (const id of habitIds) {
        for (const { year, month } of monthPairs) {
          const { logs } = await fetchHabitLogs(id, year, month);
          if (!logs) continue;
          for (const log of logs) {
            const key = normalizeLogDate(log.date);
            merged[id][key] = log.count;
          }
        }
      }
      return merged;
    },
    enabled: habitIds.length > 0,
  });

  const adherenceRows = buildHabitAdherenceForDayKeys(
    habits,
    logsQuery.data ?? {},
    dayKeys
  );

  const questionnaireOverview = useMemo(() => {
    if (!questionnaireRaw?.responses) return [];
    const parsed = parseQuestionnaireResponsesFromApi(
      questionnaireRaw.responses
    );
    return buildQuestionnaireOverview(parsed);
  }, [questionnaireRaw]);

  const patientDisplayName = useMemo(() => {
    if (profile?.firstName || profile?.lastName) {
      return [profile.firstName, profile.lastName].filter(Boolean).join(" ");
    }
    if (user?.firstName || user?.lastName) {
      return [user.firstName, user.lastName].filter(Boolean).join(" ");
    }
    return null;
  }, [profile, user]);

  const isLoading =
    questionnaireLoading ||
    questionnaireFmtLoading ||
    habitsLoading ||
    (habitIds.length > 0 && logsQuery.isLoading);

  const isError =
    questionnaireError ||
    questionnaireFmtError ||
    habitsError ||
    logsQuery.isError;

  const error =
    questionnaireErr ??
    habitsErr ??
    logsQuery.error ??
    undefined;

  return {
    score: questionnaireFormatted?.score ?? null,
    lastCompleted: questionnaireFormatted?.lastCompleted ?? null,
    hasNoQuestionnaire: hasNoData,
    questionnaireOverview,
    adherenceRows,
    patientDisplayName,
    generatedAtLabel: format(new Date(), "MMMM d, yyyy"),
    isLoading,
    isError,
    error,
    habitsCount: habits.length,
  };
}
