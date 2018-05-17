import styled from 'styled-components';
import { Col } from 'react-flexbox-grid';
import * as mixins from 'styles/mixins';

const Column = styled(Col)`
  ${(props) => props.team ? `
    transform: translateX(40px);
    ` : ''}
  ${mixins.bp.sm.max`
      ${(props) => props.team ? `
        transform: unset;
      ` : ''}
  `}
`;

export default Column;
