import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const A = styled.a`
  &:not(:first-of-type) {
    margin-left: 29px;
  }
  ${mixins.bp.md.max`
    &:not(:first-of-type) {
      margin-left: 15px;
    }
  `}
`;

export default A;
