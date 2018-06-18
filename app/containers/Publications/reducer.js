/*
 *
 * Publications reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_TO_LIST,
  REMOVE_FROM_LIST,
} from './constants';

const initialState = fromJS({
  list: [],
});

function removeByKey(array, params) {
  array.some((item, index) => {
    if (array[index][params.key] === params.value) {
      array.splice(index, 1);
      return true;
    }
    return false;
  });
  return array;
}

function publicationsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_LIST: // eslint-disable-line
      const list = state.get('list');
      return state
        .set('list', [...list, action.item]);
    case REMOVE_FROM_LIST: // eslint-disable-line
      let list2 = state.get('list'); // eslint-disable-line
      list2 = removeByKey(list2, { key: 'key', value: action.item.key }); // eslint-disable-line
      return state
        .set('list', list2);
    default:
      return state;
  }
}

export default publicationsReducer;
