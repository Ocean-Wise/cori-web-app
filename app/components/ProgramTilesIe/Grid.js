import styled from 'styled-components';
import { Grid } from 'react-flexbox-grid';
import * as mixins from 'styles/mixins';

const Grid2 = styled(Grid)`
  ${mixins.bp.xs.max`
    padding-left: 10px;
    padding-right: 10px;
  `}
`;

export default Grid2;
