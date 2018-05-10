import { createSelector } from 'reselect';

/**
 * Direct selector to the researchArea state domain
 */
const selectResearchAreaDomain = (state) => state.get('researchArea');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ResearchArea
 */

const makeSelectResearchArea = () => createSelector(
  selectResearchAreaDomain,
  (substate) => substate.toJS()
);

export default makeSelectResearchArea;
export {
  selectResearchAreaDomain,
};
