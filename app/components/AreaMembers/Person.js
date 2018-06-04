import styled from 'styled-components';

const Person = styled.div`
  margin: 0 15px;
  div {
    &:first-of-type {
      color: #6A7B83;
      font-size: 28px;
      font-weight: 300;
      line-height: 35px;
      letter-spacing: 3px;
      max-width: 255px;
    }
    &:last-of-type {
      color: #8D8D8D;
      font-size: 14px;
      letter-spacing: 1px;
      line-height: 18px;
      position: relative;
      bottom: 0px;
      display: inline-flex;
      flex-direction: column;
      span {
        color: #B2BEC4;
        font-size: 12px;
        letter-spacing: 1px;
        line-height: 21px;
        &.bold {
          font-weight: bold;
        }
      }
    }
  }
`;

export default Person;
