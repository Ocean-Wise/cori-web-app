import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const SocialWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  img {
    width: 35px;
    margin-right: 15px;
    margin-top: -10px;
  }
  ${mixins.bp.xs.max`
    img {
      margin-top: 10px;
      width: 30px;
    }
  `}
`;

export default SocialWrapper;
