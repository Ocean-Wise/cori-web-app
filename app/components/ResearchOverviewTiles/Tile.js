import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Tile = styled.div`
  width: ${(props) => props.width};
  position: relative;
  height: 460px;
  ${mixins.bp.sm.max`
    ${(props) => props.last ? `
      height: 219px;
    ` : ''}
  `}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url(${(props) => props.image});
  background-size: cover;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 100%);
    opacity: 0.6;
  }

  ${'' /* ${mixins.bp.xs.max`
    height: 210px;
  `} */}
  span.areaClassifier {
    font-size: 26px;
  }
  span.initialTitle {
    color: #FFFFFF;
    font-size: 36px;
    font-weight: 300;
    line-height: 45px;
    letter-spacing: 3px;
    margin: 0 auto;
    z-index: 5;
    position: relative;
    bottom: 32px;
    width: 560px;
    text-align: center;
    ${mixins.bp.lg.max`
      font-size: 32px;
      width: 90%;
    `}
    ${mixins.bp.sm.max`
      font-size: 26px;
      line-height: 25px;
    `}
  }
  span.subsequent {
    width: 400px;
    ${mixins.bp.lg.max`
      width: 90%;
      // bottom: 42px;
    `}
    ${mixins.bp.sm.max`
      bottom: 23px;
    `}
  }
  span.explore {
    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    line-height: 12px;
  }

  div {
    opacity: 0;
  }

  div#hotTopic {
    height: 23px;
    width: 106px;
    margin: 0 auto;
    margin-bottom: 10px;
    color: #FFFFFF;
    font-size: 12px;
    line-height: 22px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.4);
    opacity: 1;
  }

  &:hover {
    &::before {
      background-color: rgba(0,179,152,0.8);
      background-image: unset;
      opacity: unset;
      border: 8px solid white;
    }
    span.areaClassifier {
      display: none;
    }
    span.initialTitle {
      display: none;
    }
    div {
      opacity: 1;
    }
  }

  ${mixins.bp.xs.max`
    div#hover {
      position: unset !important;
    }
  `}

  @media all and (max-width: 321px) {
    span#topTitle {
      bottom: 62px;
    }
  }

`;

export default Tile;
