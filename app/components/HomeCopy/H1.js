import styled from 'styled-components';
import NormalH1 from 'components/H1';
import * as mixins from 'styles/mixins';

const H1 = styled(NormalH1)`
  color: #B2BEC4;
  font-size: 72px;
  font-weight: bold;
  line-height: 79px;
  ${(props) => props.section ? `
    margin-top: 15px;
    margin-bottom: 0;
    ` : ''}
  ${mixins.bp.md.max`
    ${(props) => props.section ? `
      font-size: 45px;
      margin-top: 0;
    ` : ''}
  `}
  ${mixins.bp.sm.max`
    ${(props) => props.section ? `
      text-align: left;
    ` : ''}
  `}
  ${mixins.bp.xs.max`
    ${(props) => !props.section ? `
      font-size: 50px;
      line-height: 61px;
      text-align: center;
      margin-top: 60px;
      margin-bottom: 10px;
    ` : `
      margin-top: 10px;
      font-size: 49px;
      line-height: 61px;
    `}
  `}
`;

export default H1;
