import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const HoverContainer = styled.div`
  z-index: 10;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: inherit;
  h1 {
    margin: 0 auto;
    z-index: inherit;
    align-self: flex-start;
  }
  div {
    z-index: inherit;
  }
  button {
    align-self: flex-end;
  }
  ${mixins.bp.sm.max`
    padding-top: 15px;
    h1 {
      font-size: 26px;
    }
    button {
      margin-top: 15px !important;
    }
  `}
`;

export default HoverContainer;
