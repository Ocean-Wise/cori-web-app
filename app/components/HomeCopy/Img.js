import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Img = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  height: 100%;
  width: 50%;
  @media all and (max-width: 1400px) {
    width: 40%;
  }
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
    height: 390px;
    width: 65%;
    margin: 0 auto;
  `}
  ${mixins.bp.xs.max`
    height: 269px;
    width: 90%;
  `}
`;

export default Img;
