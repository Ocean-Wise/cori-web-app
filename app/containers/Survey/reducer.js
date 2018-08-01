/*
 *
 * Survey reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPLOAD_DOCUMENT_REQUEST,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAIL,
} from './constants';

const initialState = fromJS({
  file: [],
  name: '',
});

function surveyReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_DOCUMENT_FAIL:
      return state;
    case UPLOAD_DOCUMENT_SUCCESS:
      return state;
    case UPLOAD_DOCUMENT_REQUEST:
      return state
        .set('file', [...action.files])
        .set('name', action.name);
    default:
      return state;
  }
}

export default surveyReducer;
