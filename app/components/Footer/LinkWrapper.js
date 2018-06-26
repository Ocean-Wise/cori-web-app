import styled from 'styled-components';
import * as mixins from 'styles/mixins';
import Wrapper from './Wrapper';

const LinkWrapper = styled.div`
  ${Wrapper}
  border-top: none;
  ${mixins.bp.xs.max`
    max-width: 530px;
  `}
  ${mixins.bp.md.min`
    width: unset;
    `}
`;

export default LinkWrapper;
