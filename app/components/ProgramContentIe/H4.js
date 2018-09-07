import styled from 'styled-components';
import NormalH4 from 'components/H4';
import * as mixins from 'styles/mixins';

const H4 = styled(NormalH4)`
  color: #00B398;
  font-size: 36px;
  font-weight: 300;
  letter-spacing: 3px;
  line-height: 45px;
  margin: 0;
  text-transform: uppercase;
  ${mixins.bp.xs.max`
    font-size: 24px;
    margin-bottom: -16px;
    line-height: 36px;
  `}
`;

export default H4;
