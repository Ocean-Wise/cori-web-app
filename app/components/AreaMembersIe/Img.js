import styled from 'styled-components';

import ImageFilter from 'react-image-filter';

const Img = styled(ImageFilter)`
  height: 250px;
  width: 250px;
  box-shadow: 0 2px 4px -2px rgba(0,0,0,0.24), 0 6px 10px 0 rgba(0,0,0,0.12), 16px -16px 0 0 #CCF0EA;
  margin-bottom: 15px;
`;

export default Img;
