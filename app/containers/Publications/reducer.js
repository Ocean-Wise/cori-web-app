/*
 *
 * Publications reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_TO_LIST,
  REMOVE_FROM_LIST,
  SET_LIMIT,
} from './constants';

const initialState = fromJS({
  list: [],
  limit: 10,
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
      const list2 = removeByKey(state.get('list'), { key: 'key', value: action.item.key });
      return state
        .set('list', [...list2]);
    case SET_LIMIT:
      return state
        .set('limit', action.limit);
    default:
      return state;
  }
}

export default publicationsReducer;
