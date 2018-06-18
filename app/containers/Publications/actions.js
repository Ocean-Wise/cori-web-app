/*
 *
 * Publications actions
 *
 */

import {
  ADD_TO_LIST,
  REMOVE_FROM_LIST,
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
