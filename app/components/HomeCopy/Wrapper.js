import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Wrapper = styled.div`
  width: 100%;
  padding: 60px 0;
  &:nth-of-type(even) {
    background-color: rgba(177,177,177,0.41);
  }
  ${mixins.bp.sm.max`
    // background-color: unset !important;
    padding: 0;
    padding-bottom: 50px;
  `}
`;

export default Wrapper;
