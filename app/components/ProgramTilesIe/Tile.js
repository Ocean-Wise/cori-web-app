import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Tile = styled.div`
  position: relative;
  ${(props) => {
    switch (props.imageAlign) {
      case 'Left':
        return 'background-position-x: left;';
      case 'Right':
        return 'background-position-x: right;';
      case 'Top':
        return 'background-position-y: top;';
      case 'Bottom':
        return 'background-position-y: bottom;';
      case 'Center':
        return 'background-position: center;';
      default:
        return 'background-position: unset;';
    }
  }}
  background-image: url(${(props) => props.image});
  background-size: cover;
  height: 425px;
  width: 425px;
  div {
    opacity: 0;
  }
  span.explore {
    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    line-height: 12px;
  }
  span#attribution {
    position: absolute;
    top: 8px;
    right: 16px;
    color: rgba(255,255,255,0.5);
    writing-mode: vertical-rl;
    font-size: 9px;
  }
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
  ${mixins.bp.lg.max`
    /**
     * Math.clamp() here essentially works as max-width/max-height, but maintains
     * the ability to pass dimention values to children via inherit
     */
    height: ${(props) => Math.clamp(((props.width / 3) - 118), 0, 425)}px;
    width: ${(props) => Math.clamp(((props.width / 3) - 118), 0, 425)}px;
  `}
  ${mixins.bp.md.max`
    height: ${(props) => ((props.width / 2) - 85)}px;
    width: ${(props) => ((props.width / 2) - 85)}px;
  `}
  ${mixins.bp.xs.max`
    height: ${(props) => (props.width - 50)}px;
    width: ${(props) => (props.width - 50)}px;
  `}
  &:hover {
    &::before {
      background-color: rgba(0,179,152,0.8);
      background-image: unset;
      opacity: unset;
      border: 8px solid white;
    }
    div {
      opacity: 1;
    }
    .initialTitle {
      display: none;
    }
    span#attribution {
      display: none;
    }
  }
`;

export default Tile;
