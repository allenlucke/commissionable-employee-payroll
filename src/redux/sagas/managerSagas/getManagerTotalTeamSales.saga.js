import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getManagerTotalTeamSales(action) {
    console.log(action.payload);
    const id = action.payload.id;
    const secLvl = action.payload.securityLevel;
    const teamsID = action.payload.team_id;
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/manager/teamSales/' + secLvl + '/' + id + '/' + teamsID,
        })
        yield put({
            type: 'SET_MANAGER_TOTAL_TEAM_SALES',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching all sales', err);
    }
}
function* getManagerTotalTeamSalesSaga() {
    yield takeLatest('GET_MANAGER_TOTAL_TEAM_SALES', getManagerTotalTeamSales);
}

export default getManagerTotalTeamSalesSaga;