/**
 * Submit our survey data!
 */

import { put, takeLatest, select } from 'redux-saga/effects';
import { UPLOAD_DOCUMENT_REQUEST } from 'containers/Survey/constants';
import { uploadSuccess, uploadFail } from 'containers/Survey/actions';
import { makeSelectFiles, makeSelectSurveyData, makeSelectName } from 'containers/Survey/selectors';
import axios from 'axios';

export function* handleUpload() {
  // Select our file array, survey name, and survey data from our Redux state
  const files = yield select(makeSelectFiles());
  const surveyName = yield select(makeSelectName());
  const survey = yield select(makeSelectSurveyData());

  try {
    // Post our survey data to the server
    yield axios.post(`${window.location.origin}/api/uploadSurvey`, {
      surveyName,
      data: {
        survey,
        files,
      },
    });
    // The submission succeeded on the survey, so dispatch our uploadSuccess Redux action to tell the application of the outcome
    yield put(uploadSuccess());
  } catch (err) {
    // The server failed to submit the data, so dispatch our uploadFail Redux action
    yield put(uploadFail(err));
  }
}

// Watch for the UPLOAD_DOCUMENT_REQUEST Redux action, and if it has fired, run the handleUpload function above
export default function* watchData() {
  yield takeLatest(UPLOAD_DOCUMENT_REQUEST, handleUpload);
}
