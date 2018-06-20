import styled from 'styled-components';
// import * as mixins from 'styles/mixins';

const SurveyRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  padding-right: 5px;
  &:first-of-type {
    padding-left: 0px;
  }
  &:last-of-type {
      padding-right: 0px;
  }
`;

export default SurveyRow;
