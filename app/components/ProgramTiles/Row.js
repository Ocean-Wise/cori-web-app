import styled from 'styled-components';
import { Row } from 'react-flexbox-grid';
import * as mixins from 'styles/mixins';

const Row2 = styled(Row)`
  ${mixins.bp.md.max`
    margin: 0 auto;
  `}
`;

export default Row2;
