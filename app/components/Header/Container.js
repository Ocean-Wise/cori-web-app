import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Container = styled.div`
  width: 59%;
  margin: 10px auto;
  padding: 30px 0;
  overflow-y: hidden;
  ${mixins.bp.lg.max`
    width: 95%;
    display: flex;
    justify-content: space-between;
  `}
`;

export default Container;
