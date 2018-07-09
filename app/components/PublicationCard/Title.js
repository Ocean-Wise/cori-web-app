import styled from 'styled-components';

const Title = styled.h2`
  color: #4D4D4D;
  font-size: 16px;
  line-height: 26px;
  font-weight: bold;
  ${(props) => props.citation ? `
    @media all and (max-width: 575px) {
      width: 100%;
      text-align: center;
    }
  ` : ''}
`;

export default Title;
