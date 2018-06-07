import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Img = styled.div`
  ${(props) => props.src ? `
    background-image: url(${props.src});
    background-size: cover;
  ` : ''}
  background-position: center;
  width: 100%;
  height: ${(props) => props.featured ? '410px' : '197px'};
  ${mixins.bp.xs.max`
    height: 197px;
  `}
`;

export default Img;
