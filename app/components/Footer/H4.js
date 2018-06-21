import NormalH4 from 'components/H4';
import * as mixins from 'styles/mixins';

const H4 = NormalH4.extend`
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
  color: #6A7B83;
  margin-top: 0;
  text-align: left;
  ${mixins.bp.sm.max`
    font-size: 12px;
    line-height: 14px;
    margin-top: 32px;
  `}
  ${mixins.bp.xs.max`
    text-align: center;
  `}
`;

export default H4;
