import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  ${mixins.bp.sm.max`
    flex-direction: column;
  `}
`;

export default Wrapper;
