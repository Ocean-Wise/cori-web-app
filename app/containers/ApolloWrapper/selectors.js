import { createSelector } from 'reselect';

/**
 * Direct selector to the apolloWrapper state domain
 */
const selectApolloWrapperDomain = (state) => state.get('apolloWrapper');

/**
 * Other specific selectors
 */

const selectLanguage = (state) => state.get('language');

const makeSelectLocale = () => createSelector(
 selectLanguage,
 (state) => state.get('locale')
);

/**
 * Default selector used by ApolloWrapper
 */

const makeSelectApolloWrapper = () => createSelector(
  selectApolloWrapperDomain,
  (substate) => substate.toJS()
);

export default makeSelectApolloWrapper;
export {
  selectApolloWrapperDomain,
  selectLanguage,
  makeSelectLocale,
};
