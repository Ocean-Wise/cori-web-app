import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  &:not(:first-of-type) {
    margin-left: 3em;
  }
  max-width: 190px;
  ${mixins.bp.lg.max`
    &:not(:first-of-type) {
      margin-left: 2em;
    }
  `}
  ${mixins.bp.sm.max`
    margin: 0 auto;
    width: 41%;
    &:nth-of-type(odd) {
      margin-left: 0;
    }
    &:nth-of-type(even) {
      margin-right: 0;
    }
  `}
  ${mixins.bp.xs.max`
    margin-left: 0 !important;
    margin: 0 auto;
  `}
`;

export default Row;
