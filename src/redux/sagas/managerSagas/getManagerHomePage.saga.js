import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getManagerHomePage(action) {
    console.log(action.payload);
    const userID = action.payload.id;
    const userSecLvl = action.payload.securityLevel;
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/manager/' + userSecLvl + '/' + userID,  
        })
        yield put({
            type: 'SET_MANAGER_HOMEPAGE',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching employee', err);
    }
}
function* getManagerHomePageSaga() {
    yield takeLatest('GET_MANAGER_HOMEPAGE', getManagerHomePage);
}

export default getManagerHomePageSaga;