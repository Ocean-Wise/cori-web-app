import { createSelector } from 'reselect';

/**
 * Direct selector to the publications state domain
 */
const selectPublicationsDomain = (state) => state.get('publications');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Publications
 */

const makeSelectPublications = () => createSelector(
  selectPublicationsDomain,
  (substate) => substate.toJS()
);

export default makeSelectPublications;
export {
  selectPublicationsDomain,
};
