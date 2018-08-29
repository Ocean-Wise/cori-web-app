import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 2em auto;
  width: 40px;
  height: 40px;
  position: relative;
  ${(props) => props.person ? `
    margin: 50px 100px;
  ` : ''}
`;

export default Wrapper;
