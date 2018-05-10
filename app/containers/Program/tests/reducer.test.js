
import { fromJS } from 'immutable';
import programReducer from '../reducer';

describe('programReducer', () => {
  it('returns the initial state', () => {
    expect(programReducer(undefined, {})).toEqual(fromJS({}));
  });
});
