import { createSelector } from 'reselect';

/**
 * Direct selector to the layoutContent state domain
 */
const selectLayoutContentDomain = (state) => state.get('layoutContent');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LayoutContent
 */

const makeSelectLayoutContent = () => createSelector(
  selectLayoutContentDomain,
  (substate) => substate.toJS()
);

export default makeSelectLayoutContent;
export {
  selectLayoutContentDomain,
};
