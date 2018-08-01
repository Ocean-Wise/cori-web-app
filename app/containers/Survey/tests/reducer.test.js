
import { fromJS } from 'immutable';
import surveyReducer from '../reducer';

describe('surveyReducer', () => {
  it('returns the initial state', () => {
    expect(surveyReducer(undefined, {})).toEqual(fromJS({}));
  });
});
