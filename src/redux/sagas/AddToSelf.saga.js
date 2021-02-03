import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* addToSelf(action) {
    try {
        const itemToAdd = {
            description: action.payload.newDescription,
            image: action.payload.newImage,
        }

        console.log(itemToAdd);
        
        const response = yield axios.post('/api/shelf', itemToAdd);
        console.log('Adding to shelf', itemToAdd);
        console.log('response from add:', response);

        yield put({type: 'SOMETHING'})
        
    } catch (err) {
        console.log('Error posting to shelf', err);
        
    }
}

function* shelfSaga() {
    yield takeEvery('ADD_ITEM', addToSelf)
}

export default shelfSaga;

