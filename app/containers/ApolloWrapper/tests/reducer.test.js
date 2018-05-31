
import { fromJS } from 'immutable';
import apolloWrapperReducer from '../reducer';

describe('apolloWrapperReducer', () => {
  it('returns the initial state', () => {
    expect(apolloWrapperReducer(undefined, {})).toEqual(fromJS({}));
  });
});
