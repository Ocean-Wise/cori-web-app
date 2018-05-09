
import { fromJS } from 'immutable';
import layoutContentReducer from '../reducer';

describe('layoutContentReducer', () => {
  it('returns the initial state', () => {
    expect(layoutContentReducer(undefined, {})).toEqual(fromJS({}));
  });
});
