import { fork } from "redux-saga/effects";
import noteWatcher from "./notesSaga";

export default function* rootSaga(){
    yield fork(noteWatcher);
}
// here if we are using the all it means its the blocking means it will wait for the one saga to get finished
//In general, fork is useful when a saga needs to start a non-blocking task. Non-blocking here means: the caller starts the task and continues executing without waiting for it to complete.

//fork: "Yo watcher lai parallel ma chalau, arko saga ko lagi roknu pardaina."

//all: "Sabai watcher haru ek choti ek satta run garauna lai group banako ho."