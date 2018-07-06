import styled from 'styled-components';
// import * as mixins from 'styles/mixins';


const Container = styled.div`
  position: relative;
  z-index: ${(props) => props.index};
  background-color: #FFF;
  &:nth-of-type(even) {
    background-color: #F8F9F9;
  }
`;

export default Container;
