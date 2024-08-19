import {
  faChartSimple,
  faList,
  faClipboardList,
  faSquarePollVertical,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

// Interface for sidebar links
export interface SidebarLink {
  name: string;
  path: string;
  icon: IconDefinition;
}

// Links array with icons for the habit tracker
export const habitTrackerLinks: SidebarLink[] = [
  { name: "Habits", path: "/habit-tracker/habits", icon: faList },
  { name: "Analytics", path: "/habit-tracker/analytics", icon: faChartSimple },
];

// Links array with icons for the questionnaire
export const questionnaireLinks: SidebarLink[] = [
  { name: "Questionnaire", path: "/ques/questionnaire", icon: faClipboardList },
  { name: "Results", path: "/ques/results", icon: faSquarePollVertical },
];
