import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const SelectContainer = styled.div`
  border-bottom: 1px solid #00B398;
  max-width: 1120px;
  margin: 63px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 5px;
  ${mixins.bp.xs.max`
    justify-content: center;
    padding-bottom: 25px;
  `}
`;

export default SelectContainer;
