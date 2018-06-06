import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const HoverContainer = styled.div`
  z-index: 10;
  position: relative;
  top: 65px;
  padding: 30px;
  ${mixins.bp.sm.max`
    top: 0;
    height: 219px;
    padding-top: 15px;
    h1 {
      font-size: 26px;
      margin-bottom: 5px;
      margin-top: -5px;
    }
    button {
      margin-top: 15px !important;
    }
  `}
`;

export default HoverContainer;
