import { Accordion } from "react-bootstrap";
import {
  SupportSection,
  SupportSectionTitle,
  FAQContainer,
  StyledAccordion,
} from "../../../../containers/about/styles/AboutContentStyles";

// FAQ section component
export function FAQSection() {
  return (
    <SupportSection>
      <SupportSectionTitle>Frequently Asked Questions</SupportSectionTitle>
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
              To add a new habit, click on the "Habit Tracker" card on the main
              dashboard, then click the "Add Habit" button. You can then name
              your habit and set your daily goal. To remove a habit, navigate to
              the Habit Tracker, find the habit you want to remove, and click on
              the delete icon. Note that deleting a habit will also remove all
              its tracking history.
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
              How do I complete the oral health questionnaire and what happens
              after?
            </Accordion.Header>
            <Accordion.Body>
              To complete the questionnaire, click on the "Oral Health
              Questionnaire" card on the main dashboard. You'll be presented
              with a series of questions about your oral health habits,
              symptoms, and concerns. Answer each question honestly, and you can
              always go back to previous questions if needed. Once you submit
              the questionnaire, our system will calculate your oral health
              score (0-100). Your results appear in Oral Health Summary, where
              you'll see personalized feedback and recommendations based on your
              answers. You can also open your Oral Health Report to print or
              save a shareable version for your dental visit.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6">
            <Accordion.Header>
              What is the difference between Oral Health Summary and Oral Health
              Report?
            </Accordion.Header>
            <Accordion.Body>
              Oral Health Summary is your interactive results view with your
              score, last assessment date, and recommendations. Oral Health
              Report is a print-friendly page that includes your assessment
              details and recent habit adherence in a format you can save or
              share.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="7">
            <Accordion.Header>
              How do I print or save my Oral Health Report as a PDF?
            </Accordion.Header>
            <Accordion.Body>
              Open Oral Health Report from your dashboard or the icon on Oral
              Health Summary. Then use the print icon in the page header (or
              the print button near the bottom). In your browser print dialog,
              choose "Save as PDF" if you want a digital copy.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="8">
            <Accordion.Header>
              How often should I retake the questionnaire?
            </Accordion.Header>
            <Accordion.Body>
              A good rule is every few months, or sooner if your routine has
              changed and you want to check your progress. If you've improved
              habits like brushing, flossing, or diet, retaking is a great way
              to refresh your score and recommendations.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="9">
            <Accordion.Header>
              Can I share my Oral Health Report with my dental professional?
            </Accordion.Header>
            <Accordion.Body>
              Yes. You can print the report or save it as a PDF and bring it to
              your appointment. It is meant to support conversation with your
              dental professional, not replace a clinical exam or diagnosis.
            </Accordion.Body>
          </Accordion.Item>
        </StyledAccordion>
      </FAQContainer>
    </SupportSection>
  );
}
