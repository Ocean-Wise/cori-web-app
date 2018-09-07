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
  ${mixins.bp.md.max`
    margin-bottom: 100px;
  `}
  ${mixins.bp.xs.max`
    margin-bottom: 90px;
  `}
`;

export default Container;
