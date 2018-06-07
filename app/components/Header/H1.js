import styled from 'styled-components';
import * as mixins from 'styles/mixins';
import NormalH1 from 'components/H1';

const H1 = styled(NormalH1)`
  font-size: 1.9rem;
  color: rgb(115, 131, 139);
  float: left;
  margin-top: 8px;
  span {
    font-weight: 300;
  }
  sup {
    font-size: 18px;
  }
  ${mixins.bp.xs.max`
    font-size: 24px;
    letter-spacing: 0.86px;
    line-height: 35px;
    margin-top: 0;
    margin-bottom: 0;
  `}
`;

export default H1;
