import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Wrapper = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  ${mixins.bp.md.max`
    justify-content: center;
  `}
`;

export default Wrapper;
