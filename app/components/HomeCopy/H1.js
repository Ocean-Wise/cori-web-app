import styled from 'styled-components';
import NormalH1 from 'components/H1';
import * as mixins from 'styles/mixins';

const H1 = styled(NormalH1)`
  ${(props) => props.section ? 'margin-top: 0;' : ''}
  ${mixins.bp.md.max`
    ${(props) => props.section ? 'font-size: 1.3rem;' : ''}
  `}
`;

export default H1;
