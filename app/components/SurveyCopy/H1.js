import styled from 'styled-components';
import NormalH1 from 'components/H1';
import * as mixins from 'styles/mixins';

const H1 = styled(NormalH1)`
  color: #B2BEC4;
  font-size: 72px;
  font-weight: bold;
  line-height: 79px;
  margin-bottom: 0px;
  ${mixins.bp.xs.max`
    font-size: 56px;
    line-height: 61px;
  `}
`;

export default H1;
