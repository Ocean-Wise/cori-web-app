import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Section = styled.div`
  width: 60%;
  display: block;
  margin: 0 auto;
  height: 450px;
  position: relative;
  ${''/* height: 26vw; */}
  ${''/* padding-top: 60px; */}
  ${mixins.bp.lg.max`
    width: 70%;
    height: 21.7vw;
  `}
  ${mixins.bp.sm.max`
    width: unset;
    height: unset;
    display: flex;
    flex-direction: ${(props) => props.flexDirection};
    padding-top: 80px;
  `}
`;

export default Section;
