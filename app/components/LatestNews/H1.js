import styled from 'styled-components';
import NormalH1 from 'components/H1';
import * as mixins from 'styles/mixins';

const H1 = styled(NormalH1)`
  color: #B2BEC4;
  font-size: 48px;
  font-weight: bold;
  line-height: 50px;
  margin-bottom: 15px;
  margin-top: 15px;
  ${mixins.bp.xs.max`
    font-size: 32px;
    line-height: 33px;
    position: absolute;
  `}
`;

export default H1;
