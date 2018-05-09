import { createSelector } from 'reselect';

/**
 * Direct selector to the program state domain
 */
const selectProgramDomain = (state) => state.get('program');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Program
 */

const makeSelectProgram = () => createSelector(
  selectProgramDomain,
  (substate) => substate.toJS()
);

export default makeSelectProgram;
export {
  selectProgramDomain,
};
