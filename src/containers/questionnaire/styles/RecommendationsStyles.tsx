import styled from "styled-components";
import Carousel from "react-bootstrap/Carousel";
import { scrollbarStyle } from "../../../styles/SharedStyles";

export const NoRecommendations = styled.div`
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.textGrey};
`;

export const CarouselContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const CarouselContent = styled.div`
  flex-grow: 1;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.textGrey};
  padding: 20px 40px;
  overflow-y: auto;
  ${scrollbarStyle}

  @media (max-width: 950px) {
    font-size: 12px;
    padding: 15px 30px;
  }

  @media (max-width: 430px) {
    font-size: 10px;
    padding: 10px 20px;
    margin-bottom: 10px;
  }
`;

export const CategoryText = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.green};

  @media (max-width: 950px) {
    font-size: 16px;
  }

  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

export const CustomCarousel = styled(Carousel)`
  width: 100%;
  height: 100%;
  position: relative;

  .carousel-indicators {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding: 5px;
  }

  .carousel-indicators li {
    background-color: ${({ theme }) => theme.disabledBackground};
  }

  .carousel-indicators .active {
    background-color: ${({ theme }) => theme.green};
  }

  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: auto;
    color: ${({ theme }) => theme.green};
    margin: 0 -15px;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    filter: invert(50%) sepia(100%) saturate(5000%) hue-rotate(90deg);
  }
`;
