
import { fromJS } from 'immutable';
import projectReducer from '../reducer';

describe('projectReducer', () => {
  it('returns the initial state', () => {
    expect(projectReducer(undefined, {})).toEqual(fromJS({}));
  });
});
