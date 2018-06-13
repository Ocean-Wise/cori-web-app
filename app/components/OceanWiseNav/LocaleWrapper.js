import styled from 'styled-components';
// import * as mixins from 'styles/mixins';

export default styled.div`
  transform: translateY(5px);
  margin-left: 10px;
  div#LocaleToggle {
    div:first-of-type {
      &::before {
        border-color: #FFF;
      }
    }
  }
  option {
    color: black;
  }
`;
