import styled from 'styled-components';

const MarkdownWrapper = styled.div`
  color: #4D4D4D;
  font-size: 16px;
  line-height: 26px;
  margin-bottom: 60px;
  img {
    margin-top: 8px;
    width: 100%;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24), 14px -14px 0 0 #CCF0EA !important;
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
`;

export default MarkdownWrapper;
