import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Tile = styled.div`
  position: relative;
  background-image: url(${(props) => props.image});
  background-size: cover;
  height: 365px;
  width: 365px;
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
    height: 308px;
    width: 308px;
  `}
`;

export default Tile;
