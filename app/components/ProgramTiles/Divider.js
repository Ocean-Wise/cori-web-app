import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Divider = styled.div`
  height: 8px;
  width: 64px;
  background-color: #CCF0EA;
  ${mixins.bp.lg.min`
    margin: 25px auto 0 auto;
    position: relative;
    right: 76px;
  `}
`;

export default Divider;
