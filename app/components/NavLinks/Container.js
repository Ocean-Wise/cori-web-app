import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  color: #73838b;
  font-weight: 700;
  font-size: 1rem;
  float: right;
  margin-top: -10px;
  button {
    color: #6A7B83;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    line-height: 14px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    text-transform: capitalize;
    min-width: 66px;
    min-height: 45px;
    padding: 6px 16px;
  }
  button#donate {
    margin-left: 15px !important;
    margin-right: 5px !important;
  }
`;

export default Container;
