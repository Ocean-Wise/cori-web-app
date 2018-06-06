import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Section = styled.section`
  ${'' /* ${mixins.bp.xs.max`
    margin-bottom: 15px;
  `}; */}
  span {
    font-weight: bold;
    font-size: 18px;
    color: #8D8D8D;
    margin-right: 30px;
    ${mixins.bp.sm.max`
      font-size: 12px;
      // text-align: center;
      line-height: 18px;
      margin-bottom: 10px;
    `}
  }
`;

export default Section;
