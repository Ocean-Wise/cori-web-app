import { createSelector } from 'reselect';

/**
 * Direct selector to the survey state domain
 */
const selectSurveyDomain = (state) => state.get('survey');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Survey
 */

const makeSelectSurvey = () => createSelector(
  selectSurveyDomain,
  (substate) => substate.toJS()
);

const makeSelectFiles = () => createSelector(
  selectSurveyDomain,
  (substate) => substate.get('file')
);

const makeSelectSurveyData = () => createSelector(
  selectSurveyDomain,
  (substate) => substate.get('surveyData')
);

const makeSelectName = () => createSelector(
  selectSurveyDomain,
  (substate) => substate.get('name')
);

const makeSelectSubmitted = () => createSelector(
  selectSurveyDomain,
  (substate) => substate.get('submitted')
);

export default makeSelectSurvey;
export {
  selectSurveyDomain,
  makeSelectFiles,
  makeSelectSurveyData,
  makeSelectName,
  makeSelectSubmitted,
};
