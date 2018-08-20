import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Container = styled.div`
  ${mixins.bp.xs.max`
    display: flex;
    flex-direction: column;
    text-align: center;
  `}
  ${mixins.bp.md.max`
    display: flex;
    width: 290px;
    flex-wrap: wrap;
  `}
`;

export default Container;
