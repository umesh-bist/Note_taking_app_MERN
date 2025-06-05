
import { configureStore, Tuple } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import notesReducer from './sagaReducers.js'

const sagaMiddleware=createSagaMiddleware()
const store=configureStore({
    reducer:{
        notes:notesReducer
    }
    ,
    middleware: () => new Tuple(sagaMiddleware)
    // middleware:(getDefault)=>getDefault().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga);
export default store;