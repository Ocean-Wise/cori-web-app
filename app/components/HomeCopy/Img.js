import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Img = styled.img`
  width: 480px;
  height: 440px;
  ${(props) => props.float === 'right' ? `
    box-shadow: 0 8px 16px -8px rgba(0,0,0,0.24), 0 16px 32px 0 rgba(0,0,0,0.12), 32px -32px 0 0 #CCF0EA;
    float: right;
  ` : `
    box-shadow: 0 8px 16px -8px rgba(0,0,0,0.24), 0 16px 32px 0 rgba(0,0,0,0.12), -32px -32px 0 0 #CCF0EA;
    float: left;
  `};
  ${'' /* ${mixins.bp.lg.max`
    width: 26vw;
  `} */}
  ${mixins.bp.sm.max`
    width: unset;
    // margin: 10px;
    margin-bottom: 40px;
  `}
`;

export default Img;
