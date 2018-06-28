import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Initiative = styled.div`
  padding: 0 8px 8px 0;
  color: #6A7B83;
  font-size: 12px;
  line-height: 18px;
  margin-left: 15px;
  &:focus {
    outline: none;
  }
  ${mixins.bp.xs.max`
    max-width: 83vw;
  `}
`;

export default Initiative;
