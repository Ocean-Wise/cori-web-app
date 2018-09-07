import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  max-width: 360px;
  ${mixins.bp.lg.max`
    margin: unset;
    margin-bottom: 30px;
  `}
`;

export default Container;
