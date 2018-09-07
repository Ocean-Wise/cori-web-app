import styled from 'styled-components';
import NormalH1 from 'components/H1';
// import * as mixins from 'styles/mixins';

const H1 = styled(NormalH1)`
  color: #B2BEC4;
  font-size: 56px;
  line-height: 61px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 15px;
  ${'' /* ${mixins.bp.xs.max`
  `} */}
`;

export default H1;
