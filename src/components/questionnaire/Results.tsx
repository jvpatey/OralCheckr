import { useState, useContext } from "react";
import { OralHealthStatus } from "./OralHealthStatus";
import { Recommendations } from "../../containers/questionnaire/Recommendations";
import { PageBackground } from "../PageBackground";
import { AuthContext } from "../../containers/authentication/AuthContext";
import { SignUpModal } from "../../containers/welcome/SignUpModal";
import { useHasSavedResponse } from "../../hooks/questionnaire/useHasSavedResponse";
import {
  ResultsCard,
  ResultsCardContainer,
  TilesContainer,
  TileWrapper,
  ConvertButton,
} from "./styles/ResultsStyles";

export function Results() {
  const { user } = useContext(AuthContext);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { data: hasSavedResponse } = useHasSavedResponse();

  return (
    <PageBackground>
      <ResultsCardContainer>
        <ResultsCard>
          <TilesContainer>
            <TileWrapper>
              <OralHealthStatus
                hasCompletedQuestionnaire={!!hasSavedResponse}
              />
            </TileWrapper>
            <TileWrapper>
              <Recommendations hasCompletedQuestionnaire={!!hasSavedResponse} />
            </TileWrapper>
          </TilesContainer>
          {/* If the user is a guest, display a sign up button*/}
          {user && user.role === "guest" && (
            <ConvertButton onClick={() => setShowSignUpModal(true)}>
              Want a more personalized experience? Create an account today.
            </ConvertButton>
          )}
        </ResultsCard>
      </ResultsCardContainer>
      {showSignUpModal && (
        <SignUpModal
          show={showSignUpModal}
          handleClose={() => setShowSignUpModal(false)}
        />
      )}
    </PageBackground>
  );
}
