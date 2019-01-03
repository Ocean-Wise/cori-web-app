import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const IntroContainer = styled.div`
  display: block;
  margin: 0 auto;
  margin-bottom: 25px;
  p {
    color: #4D4D4D;
    font-size: 16px;
    line-height: 26px;
  }
  ${mixins.bp.md.max`
    padding-top: 50px;
    // width: 75%;
  `}
  ${mixins.bp.xs.max`
    width: 90%;
  `}
`;

export default IntroContainer;
