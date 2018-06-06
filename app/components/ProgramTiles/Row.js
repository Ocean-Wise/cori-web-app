import styled from 'styled-components';
import { Row } from 'react-flexbox-grid';
import * as mixins from 'styles/mixins';

const Row2 = styled(Row)`
  ${(props) => props.tileContainer ? `
    width: 730px;
  ` : ''}
  ${mixins.bp.lg.max`
    ${(props) => props.tileContainer ? `
      width: auto;
      margin: 0 auto;
    ` : ''}
  `}
`;

export default Row2;
