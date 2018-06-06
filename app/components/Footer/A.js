import NormalA from 'components/A';
import * as mixins from 'styles/mixins';

const A = NormalA.extend`
  padding: 0.25em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #6A7B83 !important;
  text-decoration: none;
  font-size: 14px;
  text-align: left;
  ${mixins.bp.sm.max`
    line-height: 14px;
    font-size: 12px;

  `}
`;

export default A;
