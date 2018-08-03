import styled from 'styled-components';

const Hero = styled.div`
  width: 100%;
  height: 500px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

export default Hero;
