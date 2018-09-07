import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Section = styled.div`
  padding: 60px;
  padding-top: 30px;
  ${mixins.bp.xs.max`
    padding: 15px;
  `}
  &:nth-of-type(even) {
    background-color: #fff;
  }
  &:nth-of-type(odd) {
    background-color: #f8f9f9;
  }
`;

export default Section;
