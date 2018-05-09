import { createSelector } from 'reselect';

/**
 * Direct selector to the team state domain
 */
const selectTeamDomain = (state) => state.get('team');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Team
 */

const makeSelectTeam = () => createSelector(
  selectTeamDomain,
  (substate) => substate.toJS()
);

export default makeSelectTeam;
export {
  selectTeamDomain,
};
