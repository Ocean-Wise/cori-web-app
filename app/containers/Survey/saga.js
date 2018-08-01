/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest, select } from 'redux-saga/effects';
import { UPLOAD_DOCUMENT_REQUEST } from 'containers/Survey/constants';
import { uploadSuccess, uploadFail } from 'containers/Survey/actions';
import { makeSelectFile, makeSelectName } from 'containers/Survey/selectors';
import axios from 'axios';

export function* handleUpload() {
  // console.log('Made it to saga!');
  const file = yield select(makeSelectFile());
  const name = yield select(makeSelectName());
  // console.log(file);
  // console.log(name);
  try {
    yield axios.post(`${window.location.origin}/api/uploadSurvey`, {
      surveyName: 'annapolis',
      data: {
        name,
        email: 'ethan.dinnen@ocean.org',
        divedate: '07-17-18',
        videoLink: 'someLink',
        comments: 'This is a test!',
        files: file,
      },
    })
    .then((res) => put(uploadSuccess(res)))
    .catch((err) => put(uploadFail(err)));
  } catch (err) {
    yield put(uploadFail(err));
  }
}

export default function* watchData() {
  yield takeLatest(UPLOAD_DOCUMENT_REQUEST, handleUpload);
}
