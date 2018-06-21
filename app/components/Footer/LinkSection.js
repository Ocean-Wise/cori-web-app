import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const LinkSection = styled.section`
  display: flex;
  ${mixins.bp.sm.max`
    flex-wrap: wrap;
    justify-content: center;
  `}
`;

export default LinkSection;
