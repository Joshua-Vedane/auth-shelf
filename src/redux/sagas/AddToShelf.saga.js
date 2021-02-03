import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* addToSelf(action) {
  console.log(action.payload);

  try {
    const itemToAdd = {
      description: action.payload.description,
      image: action.payload.image_url,
    };

    console.log(itemToAdd);

    const response = yield axios.post('/api/shelf', itemToAdd);
    console.log('Adding to shelf', itemToAdd);
    console.log('response from add:', response.data);

    yield put({ type: 'FETCH_SHELF' });
  } catch (err) {
    console.log('Error posting to shelf', err);
  }
}

function* addToShelfSaga() {
  yield takeEvery('ADD_ITEM', addToSelf);
}

export default addToShelfSaga;
