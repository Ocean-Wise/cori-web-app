import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  ${(props) => !props.tiles ? `
    justify-content: center;
  ` : 'height: 350px;'}
`;

export default Row;
