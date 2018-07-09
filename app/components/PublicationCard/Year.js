import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Year = styled.span`
  padding-left: 16px;
  color: #4D4D4D;
  font-size: 16px;
  line-height: 26px;
  margin-top: 13.280px;
  ${mixins.bp.sm.max`
    padding-left: unset;
    margin-top: -5px;
  `}
`;

export default Year;
