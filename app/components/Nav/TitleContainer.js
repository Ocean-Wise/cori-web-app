import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const TitleContainer = styled.div`
  font-size: 24px;
  font-weight: 300;
  line-height: 35px;
  letter-spacing: 2.57px;
  border-bottom: 1px solid #CED5D9;
  width: 286px;
  margin-left: 32px;
  padding-top: 24px;
  padding-bottom: 16px;
  text-transform: uppercase;
  color: #00B398;
  ${mixins.bp.sm.max`
    width: 256px;
  `}
`;

export default TitleContainer;
