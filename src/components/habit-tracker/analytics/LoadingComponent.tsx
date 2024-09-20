import styled from "styled-components";
import { colors } from "../../../common/utilities/color-utils";
import { Spinner } from "react-bootstrap";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
`;

const GreenSpinner = styled(Spinner)`
  color: ${colors.green};

  .spinner-border {
    border-color: ${colors.green};
  }
`;

export const LoadingComponent = () => (
    <LoadingContainer>
      <GreenSpinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </GreenSpinner>
    </LoadingContainer>
  );
  