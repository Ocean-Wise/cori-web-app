import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Section = styled.section`
  ${'' /* ${mixins.bp.xs.max`
    margin-bottom: 15px;
  `}; */}
  span {
    font-weight: bold;
    font-size: 12px;
    color: #B2BEC4;
    line-height: 18px;
    &:not(#copy) {
      margin-right: 30px;
    }
    &#copy {
      font-weight: normal;
    }
    ${mixins.bp.sm.max`
      font-size: 12px;
      // text-align: center;
      line-height: 18px;
      margin-bottom: 10px;
    `}
    ${mixins.bp.xs.max`
      margin-right: 0 !important;
    `}
  }
`;

export default Section;
