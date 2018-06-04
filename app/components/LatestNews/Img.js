import styled from 'styled-components';

const Img = styled.div`
  ${(props) => props.src ? `
    background-image: url(${props.src});
    background-size: cover;
  ` : ''}
  background-position: center;
  width: 100%;
  height: ${(props) => props.featured ? '410px' : '197px'}
`;

export default Img;
