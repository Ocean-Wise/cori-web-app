import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Section = styled.section`
  ${mixins.bp.xs.max`
    margin-bottom: 15px;
  `};
  span {
    font-weight: bold;
    font-size: 18px;
    color: #868686;
    margin-right: 30px;
  }
`;

export default Section;
