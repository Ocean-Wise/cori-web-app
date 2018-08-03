/*
 *
 * Survey actions
 *
 */
import {
  UPLOAD_DOCUMENT_REQUEST,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: UPLOAD_DOCUMENT_FAIL,
  };
}

export function uploadSuccess() {
  return {
    type: UPLOAD_DOCUMENT_SUCCESS,
  };
}

export function uploadFail(error) {
  return {
    type: UPLOAD_DOCUMENT_FAIL,
    error,
  };
}

export function uploadRequest({ files, name, surveyData }) {
  return {
    type: UPLOAD_DOCUMENT_REQUEST,
    files,
    name,
    surveyData,
  };
}
