import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const IntroContainer = styled.div`
  width: 75%;
  display: block;
  margin: 0 auto;
  margin-bottom: 45px;
  background-color: #FFFFFF;
  p {
    color: #4D4D4D;
    font-size: 16px;
    line-height: 26px;
  }
  ${mixins.bp.md.max`
    padding-top: 50px;
    // width: 75%;
  `}
`;

export default IntroContainer;
