import styled from "styled-components";

export const DashboardCardContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;

  @media (max-width: 1100px) {
    margin-left: 0;
    padding: 10px;
    overflow-y: auto;
    flex-direction: column;
  }

  @media (max-height: 700px) {
    padding: 10px;
    overflow-y: auto;
    flex-direction: column;
  }
`;
