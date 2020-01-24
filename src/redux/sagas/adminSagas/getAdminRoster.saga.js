import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getRoster(action) {
    console.log(action.payload);
    const id = action.payload.id;
    const secLvl = action.payload.securityLevel;
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/admin/roster/' + secLvl + '/' + id, 
        })
        yield put({
            type: 'SET_ADMIN_ROSTER',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching all sales', err);
    }
}
function* getAdminRosterSaga() {
    yield takeLatest('GET_ADMIN_ROSTER', getRoster);
}

export default getAdminRosterSaga;