import styled from 'styled-components';

const MarkdownWrapper = styled.div`
  color: #4D4D4D;
  font-size: 16px;
  line-height: 26px;
  margin-bottom: 60px;
  h1 {
    font-size: 36px;
    font-weight: 300;
    letter-spacing: 3px;
    line-height: 45px;
    color: #00B398;
    text-transform: uppercase;
  }
  img {
    margin-top: 8px;
    margin-bottom: 5px;
    width: 100%;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24), 14px -14px 0 0 #CCF0EA !important;
    + em {
      margin-top: 5px;
      color: #8D8D8D;
      font-size: 14px;
      line-height: 18px;
      font-style: normal;
    }
  }
  blockquote {
    p {
      color: #8D8D8D;
      font-size: 24px;
      font-style: italic;
      font-weight: 300;
      line-height: 34px;
    }
  }
  a {
    color: rgb(0, 179, 152) !important;
  }
`;

export default MarkdownWrapper;
