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
  surveyData: {},
  name: '',
  submitted: false,
});

function surveyReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_DOCUMENT_FAIL:
      // Submission failed, so set submitted to false :(
      return state
        .set('submitted', false);
    case UPLOAD_DOCUMENT_SUCCESS:
      // Submission succeeded, so set submitted to true
      return state
        .set('submitted', true);
    case UPLOAD_DOCUMENT_REQUEST:
      // Set the file array to contain the passed file object array, and set the surveyData object and name
      return state
        .set('file', [...action.files])
        .set('surveyData', action.surveyData)
        .set('name', action.name);
    default:
      return state;
  }
}

export default surveyReducer;
