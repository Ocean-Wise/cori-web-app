import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const ResearchArea = styled.div`
  color: #6A7B83;
  font-size: 18px;
  font-weight: bold;
  line-height: 21px;
  padding: 12px 12px 12px 0;
  transition: all 250ms cubic-bezier(0.805, 0.125, 0.500, 0.750);
  border-bottom: 1px solid #CED5D9;
  margin: 0 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  svg {
    padding: 4px 0;
  }
  ${mixins.bp.xs.max`
    max-width: 83vw;
  `}
`;

export default ResearchArea;
