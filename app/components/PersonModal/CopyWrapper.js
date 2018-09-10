import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const CopyWrapper = styled.div`
  width: 375px;
  margin-left: 320px;
  ${mixins.bp.sm.max`
    margin-left: unset;
    width: unset;
    margin: 15px;
  `}
`;

export default CopyWrapper;
