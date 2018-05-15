import styled from 'styled-components';
import NormalPaper from 'material-ui/Paper';
import * as mixins from 'styles/mixins';

const Paper = styled(NormalPaper)`
  position: relative;
  ${(props) => props.featured ?
    (`
      width: 100%;
      margin: 5px 0;
    `) :
    (`
      width: 50%;
      &:first-of-type {
        margin: 0 5px 5px 0;
      }
      &:last-of-type {
        margin: 0 0 5px 5px;
      }
    `)
  }
  ${mixins.bp.sm.max`
    width: 100%;
    margin: 5px 0 !important;
  `}
`;

export default Paper;
