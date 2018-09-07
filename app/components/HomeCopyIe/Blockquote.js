import styled from 'styled-components';
import Block from 'components/Blockquote';
import * as mixins from 'styles/mixins';

const Blockquote = styled(Block)`
  color: #8D8D8D;
  ${mixins.bp.xs.max`
    width: 90%;
    margin: 0 auto;
    font-size: 20px;
    line-height: 29px;
  `}
`;

export default Blockquote;
