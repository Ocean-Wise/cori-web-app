import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: #73838b;
  font-weight: 700;
  font-size: 1rem;
  float: right;
  margin-top: 20px;
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
    padding: 0 12px;
    margin: -8px 20px;
    color: rgba(106,124,131,1);
  }
  button.search {
    margin-left: 7px;
    svg {
      color: rgba(180, 192, 198, 1);
    }
  }
`;

export default Container;
