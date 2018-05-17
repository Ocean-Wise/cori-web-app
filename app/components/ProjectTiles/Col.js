import styled from 'styled-components';

const Col = styled.div`
  display: flex;
  flex-direction: column;
  &:first-of-type {
    flex-grow: 0.83;
  }
  &:last-of-type {
    flex-grow: 1;
  }
`;

export default Col;
