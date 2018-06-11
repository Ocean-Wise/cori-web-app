import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Tile = styled.div`
  position: relative;
  background-image: url(${(props) => props.image});
  background-size: cover;
  height: 425px;
  width: 425px;
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
    height: ${(props) => (props.width - 70)}px;
    width: ${(props) => (props.width - 70)}px;
  `}
`;

export default Tile;
