import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteAdminRoster(action) {
    console.log(action.payload);
    const id = action.payload.id;
    console.log(id)
    const secLvl = action.payload.securityLevel;
    try {
        const response = yield axios({
            method: 'DELETE',
            url: '/api/admin/roster/' + secLvl + '/' + id, 
        })
        yield put({
            type: 'SET_ADMIN_ROSTER',
            // payload: response.data
        });
    } catch(err) {
        console.log('Error fetching all sales', err);
    }
}
function* deleteAdminRosterSaga() {
    yield takeLatest('ADMIN_DELETE_EMP', deleteAdminRoster);
}

export default deleteAdminRosterSaga;
