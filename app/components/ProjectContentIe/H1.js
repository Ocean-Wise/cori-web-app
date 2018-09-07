import styled from 'styled-components';
import NormalH1 from 'components/H1';
import * as mixins from 'styles/mixins';

const H1 = styled(NormalH1)`
  color: #B2BEC4;
  font-size: 72px;
  font-weight: bold;
  line-height: 79px;
  margin-top: 16px;
  ${mixins.bp.xs.max`
    font-size: 37px;
    line-height: 40px;
  `}
`;

export default H1;
