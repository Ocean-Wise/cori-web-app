import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const ProgramContainer = styled.div`
  border-bottom: 1px solid #CED5D9;
  ${mixins.bp.xs.max`
    max-width: 83vw;
  `}
`;

export default ProgramContainer;
