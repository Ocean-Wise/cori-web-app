import { createSelector } from 'reselect';

/**
 * Direct selector to the project state domain
 */
const selectProjectDomain = (state) => state.get('project');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Project
 */

const makeSelectProject = () => createSelector(
  selectProjectDomain,
  (substate) => substate.toJS()
);

export default makeSelectProject;
export {
  selectProjectDomain,
};
