
import { fromJS } from 'immutable';
import publicationsReducer from '../reducer';

describe('publicationsReducer', () => {
  it('returns the initial state', () => {
    expect(publicationsReducer(undefined, {})).toEqual(fromJS({ list: [] }));
  });
});
