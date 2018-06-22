import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Container = styled.div`
  width: 59%;
  margin: 10px auto -15px;
  padding: 30px 0;
  overflow-y: hidden;
  ${mixins.bp.lg.max`
    width: 95%;
    display: flex;
    justify-content: space-between;
  `}
  ${mixins.bp.xs.max`
    padding-top: 20px;
    padding-bottom: 45px;
  `}
`;

export default Container;
