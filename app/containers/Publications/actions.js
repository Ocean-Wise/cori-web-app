/*
 *
 * Publications actions
 *
 */

import {
  ADD_TO_LIST,
  REMOVE_FROM_LIST,
  SET_LIMIT,
} from './constants';

export function addToList(item) {
  return {
    type: ADD_TO_LIST,
    item,
  };
}

export function removeFromList(item) {
  return {
    type: REMOVE_FROM_LIST,
    item,
  };
}

export function setLimit(limit) {
  return {
    type: SET_LIMIT,
    limit,
  };
}
