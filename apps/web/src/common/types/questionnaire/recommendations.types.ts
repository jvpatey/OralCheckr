/* -- Recommendations types -- */

// Template for a trackable habit suggested from a questionnaire option
export interface SuggestedHabit {
  name: string;
  count: number;
}

// Recommendation interface
export interface Recommendation {
  category: string;
  feedback: string;
  suggestedHabit?: SuggestedHabit;
}
