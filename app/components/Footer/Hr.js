import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Hr = styled.div`
  display: none;
  ${mixins.bp.xs.max`
    display: inline-block;
    margin-top: 45px;
    border-top: 1px solid #E9EEF6;
    width: 95%;
    height: 1px;
    margin-bottom: 30px;
  `}
`;

export default Hr;
