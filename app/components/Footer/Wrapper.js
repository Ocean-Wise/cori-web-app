import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  ${mixins.bp.lg.min`
    padding: 3em 12em;
  `}
  ${mixins.bp.lg.max`
    padding: 40px 15px;
  `}

  ${mixins.bp.xs.max`
    flex-direction: column;
    align-items: center;
    text-align: center;
  `};
`;

export default Wrapper;
