import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Container = styled.div`
  text-align: center;
  ${mixins.bp.lg.max`
    text-align: unset;
    margin-bottom: 30px;
  `}
`;

export default Container;
