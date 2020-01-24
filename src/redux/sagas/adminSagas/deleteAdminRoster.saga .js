import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteAdminRoster(action) {
    console.log(action.payload);
    const empID = action.payload.empID;
    const userSecLvl = action.payload.userSecLvl;
    const userID = action.payload.userID
    try {
        yield axios({
            method: 'DELETE',
            url: '/api/admin/roster/' + empID + '/' + userSecLvl + '/' + userID, 
        });
        yield put({
            type: 'GET_ADMIN_ROSTER',
            payload: {
                securityLevel: userSecLvl,
                id: userID
            }
        });
    } catch(err) {
        console.log('Error deleting employee', err);
    }
}
function* deleteAdminRosterSaga() {
    yield takeLatest('ADMIN_DELETE_EMP', deleteAdminRoster);
}

export default deleteAdminRosterSaga;
