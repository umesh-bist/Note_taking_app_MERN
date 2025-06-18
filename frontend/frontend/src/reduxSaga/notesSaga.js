
import { call, put, takeLatest } from "redux-saga/effects";
import { addNoteApi, deleteNoteApi,editNoteAPi, fetchNoteApi } from "./notesApi";

import {
  addNoteFailure,
  addNoteRequest,
  addNoteSuccess,
  deleteNoteFailure,
  deleteNoteRequest,
  deleteNoteSuccess,
  editNoteFailure,
  editNoteRequest,
  editNoteSuccess,
  fetchNoteFailure,
  fetchNoteRequest,
  fetchNoteSuccess,
} from './sagaReducers.js'


function* fetchNoteSaga() {
  try {
    const response = yield call(fetchNoteApi);
 
    yield put(fetchNoteSuccess(response.data));
  } catch (error) {
    yield put(fetchNoteFailure(error.message));
  }
}

function* addNoteSaga(action) {
  try {
    const response = yield call(addNoteApi, action.payload);
    
    yield put(addNoteSuccess(response.data)); 
  } catch (error) {
    yield put(addNoteFailure(error.message));
  }
}
function* deleteNoteSaga(action) {
  try {
    yield call(deleteNoteApi, action.payload);
    yield put(deleteNoteSuccess(action.payload));
  } catch (error) {
    yield put(deleteNoteFailure(error.message));
  }
}

function* editNoteSaga(action){
  try{
    const {id,note}=action.payload
    const response=yield call(editNoteAPi,id,note);
    
    yield put(editNoteSuccess(response.data.note))
  }
  catch(error){
    yield put(editNoteFailure(error.message))
  }
}

export default function* noteWatcher() {
  yield takeLatest(fetchNoteRequest.type, fetchNoteSaga);
  yield takeLatest(addNoteRequest.type, addNoteSaga);
  yield takeLatest(deleteNoteRequest.type, deleteNoteSaga);
  yield takeLatest(editNoteRequest.type,editNoteSaga)

}
