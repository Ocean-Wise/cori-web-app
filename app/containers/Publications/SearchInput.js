import styled from 'styled-components';
import SearchInput from 'react-search-input';

const StyledSearch = styled(SearchInput)`
  margin: 0 auto;
  margin-right: 16px;
  border: 1px solid #B2BEC4;
  border-radius: 2px;
  max-width: 650px;
  max-height: 32px;
  padding: 3px 10px;
  input {
    width: 100%;
    &:focus {
      outline: none;
    }
  }
`;

export default StyledSearch;
