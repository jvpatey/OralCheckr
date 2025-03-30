import { DeleteButton } from "../styles/AccountSettingsStyles";
import {
  Section,
  SectionTitle,
  DataItem,
  Label,
  Value,
  HabitList,
  HabitItem,
} from "../styles/DataTabStyles";

export function DataTab() {
  return (
    <>
      <Section>
        <SectionTitle>Questionnaire Data</SectionTitle>
        <DataItem>
          <Label>Most Recent Completion</Label>
          <Value>Not completed yet</Value>
        </DataItem>
        <DataItem>
          <Label>Oral Health Score</Label>
          <Value>No score available</Value>
        </DataItem>
        <DeleteButton>Delete Questionnaire Data</DeleteButton>
      </Section>

      <Section>
        <SectionTitle>Habit Tracking Data</SectionTitle>
        <HabitList>
          <HabitItem>No habits tracked yet</HabitItem>
        </HabitList>
        <DeleteButton style={{ marginTop: "1rem" }}>
          Delete All Habits
        </DeleteButton>
      </Section>
    </>
  );
}
