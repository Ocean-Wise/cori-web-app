import styled from 'styled-components';

const Hero = styled.div`
  width: 100%;
  height: 500px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  span#attribution {
    position: relative;
    float: right;
    top: 8px;
    right: 16px;
    color: rgba(255,255,255,0.5);
    writing-mode: vertical-rl;
    font-size: 9px;
  }
`;

export default Hero;
