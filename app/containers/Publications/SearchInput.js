import styled from 'styled-components';
import SearchInput from 'react-search-input';
import * as mixins from 'styles/mixins';

const StyledSearch = styled(SearchInput)`
  margin: 0 auto;
  margin-right: 16px;
  border: 1px solid #B2BEC4;
  border-radius: 2px;
  max-width: 650px;
  width: 255px;
  max-height: 32px;
  padding: 3px 10px;
  input {
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  ${mixins.bp.xs.max`
    width: 110px;
  `}
`;

export default StyledSearch;
