import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Container = styled.div`
  text-align: center;
  max-width: 1140px;
  margin: 0 auto 30px;
  border-bottom: 1px solid #CED5E9;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mixins.bp.sm.max`
    justify-content: center;
  `}
`;

export default Container;
