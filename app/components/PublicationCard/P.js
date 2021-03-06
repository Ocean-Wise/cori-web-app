import styled from 'styled-components';

const P = styled.p`
  color: #8D8D8D;
  font-size: 12px;
  line-height: 18px;
  ${(props) => props.citation ? `
    font-style: italic;
  ` : ''}
`;

export default P;
