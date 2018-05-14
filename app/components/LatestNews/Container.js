import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  ${mixins.bp.sm.max`
    flex-direction: column-reverse;
  `}
`;

export default Container;
