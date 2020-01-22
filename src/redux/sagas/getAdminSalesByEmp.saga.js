import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAdminSalesByEmp(action) {
    console.log(action.payload);
    const id = action.payload.id;
    const secLvl = action.payload.securityLevel;
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/admin/teamSales/empSales/' + secLvl + '/' + id, 
        })
        yield put({
            type: 'SET_ADMIN_SALES_BY_EMPLOYEE',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching all sales', err);
    }
}
function* getAdminSalesByEmpSaga() {
    yield takeLatest('GET_ADMIN_SALES_BY_EMPLOYEE', getAdminSalesByEmp);
}

export default getAdminSalesByEmpSaga;