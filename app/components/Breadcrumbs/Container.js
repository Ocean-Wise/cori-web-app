import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Container = styled.div`
  width: 59%;
  color: #B2BEC4;
  font-size: 14px;
  margin: 0 auto;
  padding: 10px 0;
  ${mixins.bp.lg.max`
    width: 95%;
  `}
`;

export default Container;
