import styled from 'styled-components';

const HeroWrapper = styled.div`
  position: relative;
  span#attribution {
    position: absolute;
    top: 8px;
    right: 16px;
    color: rgba(255,255,255,0.5);
    writing-mode: vertical-rl;
    font-size: 9px;
  }
`;

export default HeroWrapper;
