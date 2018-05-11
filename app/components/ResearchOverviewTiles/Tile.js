import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Tile = styled.div`
  width: ${(props) => props.width};
  position: relative;
  height: 460px;
  margin: 1px;
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
  background-image: url(${(props) => props.image});
  ${'' /* &:nth-of-type(1) {
  flex-grow: 2;
  }
  &:nth-of-type(2) {
    flex-grow: 1;
  }
  &:nth-of-type(3) {
    flex-grow: 1;
  }
  &:last-of-type {
    flex-grow: 2;
  } */}
  ${mixins.bp.xs.max`
    height: 210px;
  `}
  span {
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

`;

export default Tile;
