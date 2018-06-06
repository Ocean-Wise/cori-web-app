import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 3em;
  max-width: 180px;
  ${mixins.bp.lg.max`
    margin-left: 2em;
  `}
`;

export default Row;
