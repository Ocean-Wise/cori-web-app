import styled from 'styled-components';
import NormalPaper from '@material-ui/core/Paper';

const Paper = styled(NormalPaper)`
  width: 350px;
  position: absolute;
  left: 12rem;
  @media all and (max-width: 1592px) {
    left: 4rem;
  }
  top: 250px;
  z-index: 10;
  padding-bottom: 32px;
`;

export default Paper;
