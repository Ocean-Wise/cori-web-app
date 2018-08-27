import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Section = styled.div`
  padding: 60px;
  ${(props) => props.first ? 'padding-top: 15px;' : ''}
  ${mixins.bp.xs.max`
    padding: 15px;
    ${(props) => props.first ? 'padding-top: 5px;' : `
      padding-top: 80px;
      padding-bottom: 80px;
    `}
  `}
  &:nth-of-type(even) {
    background-color: #fff;
  }
  &:nth-of-type(odd) {
    background-color: #f8f9f9;
  }

`;

export default Section;
