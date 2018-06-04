import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const CopyBlock = styled.div`
  max-width: 445px;
  float: ${(props) => props.float};
  ${mixins.bp.md.min`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${(props) => props.float === 'left' ? 'left: 0;' : 'right: 0;'}
  `}
  ${mixins.bp.sm.max`
    display: block;
    margin: 0 auto;
    text-align: center;
  `}
  p {
    font-size: 16px;
    line-height: 26px;
    color: #4D4D4D;
  }
`;

export default CopyBlock;
