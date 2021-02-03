import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* deleteFromShelf(action) {
  console.log('payload:', action.payload);

  try {
    const itemToDelete = action.payload.item_id;

    console.log(itemToDelete);

    const response = yield axios.delete(`/api/shelf/${itemToDelete}`);
    console.log('Deleting from shelf', itemToDelete);
    console.log('response from delete:', response.data);

    yield put({ type: 'FETCH_SHELF' });
  } catch (err) {
    console.log('Error deleting from shelf', err);
  }
}

function* deleteFromShelfSaga() {
  yield takeEvery('DELETE_ITEM', deleteFromShelf);
}

export default deleteFromShelfSaga;
