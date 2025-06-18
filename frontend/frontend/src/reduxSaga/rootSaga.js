import { fork } from "redux-saga/effects";
import noteWatcher from "./notesSaga";

export default function* rootSaga(){
    yield fork(noteWatcher);
}
