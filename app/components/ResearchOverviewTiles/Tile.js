import styled from 'styled-components';

const Tile = styled.div`
  width: ${(props) => props.width};
  height: 460px;
  margin: 1px;
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
  background-image: url(${(props) => props.image});
  &:nth-of-type(1) {
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
  }

`;

export default Tile;
