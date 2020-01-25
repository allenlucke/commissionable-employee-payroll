import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getManagerSalesByEmp(action) {
    console.log(action.payload);
    const id = action.payload.id;
    const secLvl = action.payload.securityLevel;
    const teamsID = action.payload.team_id;
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/manager/teamSales/empSales/' + secLvl + '/' + id + '/' + teamsID, 
        })
        yield put({
            type: 'SET_MANAGER_SALES_BY_EMPLOYEE',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching all sales', err);
    }
}
function* getManagerSalesByEmpSaga() {
    yield takeLatest('GET_MANAGER_SALES_BY_EMPLOYEE', getManagerSalesByEmp);
}

export default getManagerSalesByEmpSaga;