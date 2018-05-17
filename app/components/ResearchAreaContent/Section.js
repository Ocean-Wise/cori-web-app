import styled from 'styled-components';

const Section = styled.div`
  padding: 60px 0;
  &:nth-of-type(even) {
    background-color: #fff;
  }
  &:nth-of-type(odd) {
    background-color: #f8f9f9;
  }
`;

export default Section;
