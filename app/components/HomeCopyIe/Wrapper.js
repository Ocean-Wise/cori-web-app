import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Wrapper = styled.div`
  width: 100%;
  padding: 60px 0;
  &:nth-of-type(even) {
    background-color: #F8F9F9;
  }
  &:nth-of-type(odd) {
    background-color: #FFFFFF;
  }
  ${mixins.bp.sm.max`
    // background-color: unset !important;
    padding: 0;
    padding-bottom: 50px;
  `}
`;

export default Wrapper;
