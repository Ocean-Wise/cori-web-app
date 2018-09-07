import styled from 'styled-components';
import { Col } from 'react-flexbox-grid';
import * as mixins from 'styles/mixins';

const Column = styled(Col)`
  ${(props) => props.team ? `
    transform: translateX(40px);
    margin-bottom: 80px;
    ` : ''}
  ${mixins.bp.lg.max`
      ${(props) => props.team ? `
        transform: unset;
        margin-bottom: 32px;
      ` : ''}
  `}
`;

export default Column;
