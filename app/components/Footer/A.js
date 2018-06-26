import NormalA from 'components/A';
import * as mixins from 'styles/mixins';

const A = NormalA.extend`
  padding: 0.25em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #6A7B83 !important;
  text-decoration: none;
  line-height: 14px;
  font-size: 12px;
  margin-top: 20px;
  ${mixins.bp.xs.max`
    text-align: center;
  `}
`;

export default A;
