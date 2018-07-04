import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Container = styled.div`
  width: 59%;
  margin: 10px auto -1px;
  padding: 30px 0;
  overflow-y: hidden;
  ${mixins.bp.lg.max`
    width: 95%;
    display: flex;
    justify-content: space-between;
  `}
  @media all and (max-width: 350px) {
    img#logo {
      width: 200px !important;
    }
  }
`;

export default Container;
