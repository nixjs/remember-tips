sagaMiddleware.run(rootSaga, someArg);

function* someSaga(someArg, action) {
  // ...
}

function* rootSaga(someArg) {
  yield takeEvery("SOME_ACTION", someSaga, someArg);
}
