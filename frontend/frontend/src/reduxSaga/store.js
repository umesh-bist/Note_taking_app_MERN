
import { configureStore, Tuple } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import notesReducer from "./sagaReducers"
import errorReducer from "./errorSlice.js"

const sagaMiddleware=createSagaMiddleware()
const store=configureStore({
    reducer:{
        notes:notesReducer,
        error:errorReducer

    }
    ,
    middleware: () => new Tuple(sagaMiddleware)
    // middleware:(getDefault)=>getDefault().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga);
export default store;