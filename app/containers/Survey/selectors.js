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

const makeSelectFile = () => createSelector(
  selectSurveyDomain,
  (substate) => substate.get('file')
);

const makeSelectName = () => createSelector(
  selectSurveyDomain,
  (substate) => substate.get('name')
);

export default makeSelectSurvey;
export {
  selectSurveyDomain,
  makeSelectFile,
  makeSelectName,
};
