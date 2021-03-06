import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Container = styled.div`
  padding: 32px;
  box-shadow: 0 8px 16px -8px rgba(0,0,0,0.24), 0 16px 32px 0 rgba(0,0,0,0.12), -32px -32px 0 0 #CCF0EA;
  ${mixins.bp.lg.max`
    ${(props) => props.second ? `
      box-shadow: 0 8px 16px -8px rgba(0,0,0,0.24), 0 16px 32px 0 rgba(0,0,0,0.12), 32px -32px 0 0 #CCF0EA;
    ` : ''}
  `}
`;

export default Container;
