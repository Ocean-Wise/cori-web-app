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
  ${mixins.bp.md.max`
    max-width: 345px;
    button {
      width: 160px !important;
    }
  `}
  ${mixins.bp.sm.max`
    display: block;
    margin: 0 auto;
    text-align: center;
    margin-top: 25px;
  `}
  ${mixins.bp.xs.max`
    padding: 15px;
    p {
      text-align: left;
    }
    button {
      width: 132px !important;
    }
    a:only-of-type {
      div {
        width: 100%;
      }
      button {
        width: 100% !important;
      }
    }
  `}
  p {
    font-size: 16px;
    line-height: 26px;
    color: #4D4D4D;
  }
`;

export default CopyBlock;
