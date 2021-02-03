import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchShelf() {
  try {
    const response = yield axios.get('/api/shelf');
    console.log(response.data);
    yield put({ type: 'SET_SHELF', payload: response.data });
  } catch (err) {
    console.log('error in fetchShelf', err);
  }
}

function* shelfSaga() {
  yield takeEvery('FETCH_SHELF', fetchShelf);
}

export default shelfSaga;
