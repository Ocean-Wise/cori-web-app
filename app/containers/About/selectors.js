import { createSelector } from 'reselect';

/**
 * Direct selector to the project state domain
 */
const selectAboutDomain = (state) => state.get('about');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Project
 */

const makeSelectAbout = () => createSelector(
  selectAboutDomain,
  (substate) => substate.toJS()
);

export default makeSelectAbout;
export {
  selectAboutDomain,
};
