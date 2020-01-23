import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getSalespersonHomePage(action) {
    console.log(action.payload);
    const userID = action.payload.id;
    const userSecLvl = action.payload.securityLevel;
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/salesperson/' + userSecLvl + '/' + userID,  
        })
        yield put({
            type: 'SET_SALESPERSON_HOMEPAGE',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching employee', err);
    }
}
function* getSalespersonHomePageSaga() {
    yield takeLatest('GET_SALESPERSON_HOMEPAGE', getSalespersonHomePage);
}

export default getSalespersonHomePageSaga;