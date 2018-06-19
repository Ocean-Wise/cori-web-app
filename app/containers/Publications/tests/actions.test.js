
import {
  addToList,
} from '../actions';
import {
  ADD_TO_LIST,
} from '../constants';

describe('Publications actions', () => {
  describe('Add to list action', () => {
    it('has a type of ADD_TO_LIST', () => {
      const expected = {
        type: ADD_TO_LIST,
      };
      expect(addToList()).toEqual(expected);
    });
  });
});
