import styled from 'styled-components';
import SearchInput from 'react-search-input';

const StyledSearch = styled(SearchInput)`
  margin: 0 auto;
  border: 1px solid black;
  border-radius: 25px;
  max-width: 650px;
  padding: 8px 22px;
  input {
    width: 100%;
    &:focus {
      outline: none;
    }
  }
`;

export default StyledSearch;
