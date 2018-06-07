import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const A = styled.a`
  display: inline-block;
  color: #00B398 !important;
  font-size: 18px;
  font-weight: bold;
  line-height: 21px;
  ${mixins.bp.xs.max`
    font-size: 17px;
  `}
`;

export default A;
