import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAdminAllSales(action) {
    console.log(action.payload);
    const id = action.payload.id;
    const secLvl = action.payload.securityLevel;
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/admin/allSales/' + secLvl + '/' + id, 
        })
        yield put({
            type: 'SET_ADMIN_ALL_SALES',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching all sales', err);
    }
}
function* getAdminAllSalesSaga() {
    yield takeLatest('GET_ADMIN_ALL_SALES', getAdminAllSales);
}

export default getAdminAllSalesSaga;