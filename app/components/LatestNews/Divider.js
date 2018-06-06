import styled from 'styled-components';
// import * as mixins from 'styles/mixins';

const Divider = styled.div`
  height: 8px;
  width: 64px;
  background-color: #CCF0EA;
  ${'' /* ${mixins.bp.lg.min`
    ${(props) => props.news ? '' : `
      position: relative;
      right: 75px;
      top: 22px;
      margin: 0 auto;
    `}
  `} */}
`;

export default Divider;
