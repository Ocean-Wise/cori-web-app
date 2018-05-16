import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Tile = styled.div`
  width: ${(props) => props.width};
  position: relative;
  height: 460px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to bottom, rgba(0,47,75,0), rgb(0, 47,75));
    opacity: 0.6;
  }

  ${mixins.bp.xs.max`
    height: 210px;
  `}
  span.initialTitle {
    color: #FFFFFF;
    font-size: 36px;
    font-weight: bold;
    line-height: 45px;
    position: absolute;
    bottom: 15px;
    left: 30px;
    ${mixins.bp.sm.max`
      font-size: 26px;
      line-height: 25px;
    `}
  }
  span.explore {
    color: #FFFFFF;
    text-align: center;
  }

  div {
    display: none;
  }

  &:hover {
    &::before {
      background-color: rgba(0,179,152,0.8);
      background-image: unset;
      opacity: unset;
      border: 8px solid white;
    }
    span.initialTitle {
      display: none;
    }
    div {
      display: block;
    }
  }


`;

export default Tile;
