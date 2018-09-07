import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Section = styled.div`
  padding: 60px;
  ${mixins.bp.xs.max`
    padding: 15px;
  `}
  &:nth-of-type(even) {
    padding-top: 74px;
    background-color: #fff;
  }
  &:nth-of-type(odd) {
    padding-top: 80px;
    background-color: #f8f9f9;
  }
`;

export default Section;
