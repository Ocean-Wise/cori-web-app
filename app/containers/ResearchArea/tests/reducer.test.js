
import { fromJS } from 'immutable';
import researchAreaReducer from '../reducer';

describe('researchAreaReducer', () => {
  it('returns the initial state', () => {
    expect(researchAreaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
