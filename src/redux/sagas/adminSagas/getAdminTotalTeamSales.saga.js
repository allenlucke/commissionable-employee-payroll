import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAdminTotalTeamSales(action) {
    console.log(action.payload);
    const id = action.payload.id;
    const secLvl = action.payload.securityLevel;
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/admin/teamSales/' + secLvl + '/' + id, 
        })
        yield put({
            type: 'SET_ADMIN_TOTAL_TEAM_SALES',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching all sales', err);
    }
}
function* getAdminTotalTeamSalesSaga() {
    yield takeLatest('GET_ADMIN_TOTAL_TEAM_SALES', getAdminTotalTeamSales);
}

export default getAdminTotalTeamSalesSaga;