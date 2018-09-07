import styled from 'styled-components';

const Img = styled.div`
  width: 389px;
  height: 389px;

  background-image: url(${(props) => props.src});
  background-size: cover;
  &::before {
    width: 389px;
    height: 389px;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 100%);
    opacity: 0.6;
  }
`;

export default Img;
