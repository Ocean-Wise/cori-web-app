import styled from 'styled-components';
import NormalPaper from 'material-ui/Paper';
import * as mixins from 'styles/mixins';

const Paper = styled(NormalPaper)`
  position: relative;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24), 8px -8px 0 0 #CCF0EA !important;
  ${(props) => props.featured ?
    (`
      width: 100%;
      margin: 5px 0;
    `) :
    (`
      width: 50%;
      &:first-of-type {
        margin: 0 15px 35px 0;
      }
      &:last-of-type {
        margin: 0 0 35px 15px;
      }
    `)
  }
  ${mixins.bp.sm.max`
    width: 100%;
    margin: 5px 0 !important;
  `}
`;

export default Paper;
