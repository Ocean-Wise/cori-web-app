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
  position: relative;
  right: 66px;
  ${mixins.bp.xs.max`
    font-size: 32px;
    line-height: 33px;
    margin-bottom: 0;
  `}
`;

export default H1;
