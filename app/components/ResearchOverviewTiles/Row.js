import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
  &:last-of-type {
    margin-bottom: 0px;
  }
`;

export default Row;
