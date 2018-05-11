import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Img = styled.img`
  float: ${(props) => props.float};
  ${mixins.bp.lg.max`
    width: 26vw;
  `}
  ${mixins.bp.sm.max`
    width: unset;
    // margin: 10px;
    margin-bottom: 40px;
  `}
`;

export default Img;
