import styled from 'styled-components';

const Person = styled.div`
  margin: 0 15px;
  span {
    &:first-of-type {
      color: #00B398;
      font-size: 28px;
      font-weight: bold;
      line-height: 35px;
      max-width: 50%;
    }
    &:last-of-type {
      color: #8D8D8D;
      font-size: 14px;
      letter-spacing: 1px;
      line-height: 18px;
      position: relative;
      bottom: 0px;
    }
  }
`;

export default Person;
