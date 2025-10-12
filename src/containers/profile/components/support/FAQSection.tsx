import { Accordion } from "react-bootstrap";
import { Section, SectionTitle } from "../../styles/AccountTabStyles";
import {
  FAQContainer,
  StyledAccordion,
} from "../../../../containers/about/styles/AboutContentStyles";

// FAQ section component
export function FAQSection() {
  return (
    <Section>
      <SectionTitle>Frequently Asked Questions</SectionTitle>
      <FAQContainer>
        <StyledAccordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              How often should I complete the oral health assessment?
            </Accordion.Header>
            <Accordion.Body>
              We recommend completing the oral health assessment once every 3
              months to track changes in your oral health status. However, if
              you experience significant changes in your oral health or start a
              new oral care routine, you may want to complete it more
              frequently.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              How are my oral health scores calculated?
            </Accordion.Header>
            <Accordion.Body>
              Your oral health score is calculated based on several factors from
              your assessment responses, including brushing frequency, flossing
              habits, sensitivity levels, and any symptoms you report. The score
              ranges from 0-100, with higher scores indicating better oral
              health. This is not a clinical diagnosis but a general indicator
              of your oral health status.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              How do I add or remove habits from tracking?
            </Accordion.Header>
            <Accordion.Body>
              To add a new habit, go to the Habits tab on the main dashboard and
              click on "Add New Habit." You can then name your habit and set
              your tracking preferences. To remove a habit, visit the same
              Habits tab, find the habit you want to remove, and click on the
              delete icon. Note that deleting a habit will also remove all its
              tracking history.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              Can I use this app without creating an account?
            </Accordion.Header>
            <Accordion.Body>
              Yes, you can use the app as a guest to explore its features. The
              guest mode is designed to let you try out the app before
              committing to creating an account. If you choose to create an
              account later, all your guest data (including assessment results
              and habit tracking) will be automatically migrated to your new
              account. This ensures you don't lose any progress when
              transitioning from guest to a registered user.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>
              What happens if I miss tracking my habits for a day?
            </Accordion.Header>
            <Accordion.Body>
              Don't worry if you miss tracking your habits for a day or more.
              The app allows you to track habits retroactively. Simply select
              the habit you want to track and choose the date you missed. Your
              habit streak and statistics will be updated accordingly. We
              understand that building consistent habits takes time, and missing
              occasional days is normal in the habit-building journey.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>
              How do I complete the oral health assessment and what happens
              after?
            </Accordion.Header>
            <Accordion.Body>
              To complete the assessment, navigate to the Assessment tab on the
              main dashboard and click "Begin Assessment." You'll be presented
              with a series of questions about your oral health habits,
              symptoms, and concerns. Answer each question honestly, and you can
              always go back to previous questions if needed. Once you submit
              the assessment, our system will calculate your oral health score
              (0-100). You'll then receive personalized feedback based on your
              responses, highlighting areas of strength and suggesting
              improvements for areas of concern. This information helps you
              track your oral health progress over time and make informed
              decisions about your daily oral care routine.
            </Accordion.Body>
          </Accordion.Item>
        </StyledAccordion>
      </FAQContainer>
    </Section>
  );
}
