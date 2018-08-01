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

export function uploadSuccess({ data }) {
  return {
    type: UPLOAD_DOCUMENT_SUCCESS,
    data,
  };
}

export function uploadFail(error) {
  return {
    type: UPLOAD_DOCUMENT_FAIL,
    error,
  };
}

export function uploadRequest({ files, name }) {
  return {
    type: UPLOAD_DOCUMENT_REQUEST,
    files,
    name,
  };
}
