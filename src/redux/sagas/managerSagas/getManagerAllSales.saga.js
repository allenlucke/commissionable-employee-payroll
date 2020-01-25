import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getManagerAllSales(action) {
    console.log(action.payload);
    const id = action.payload.id;
    const secLvl = action.payload.securityLevel;
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/manager/AllSales/' + secLvl + '/' + id, 
        })
        yield put({
            type: 'SET_MANAGER_ALL_SALES',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching all sales', err);
    }
}
function* getManagerAllSalesSaga() {
    yield takeLatest('GET_MANAGER_ALL_SALES', getManagerAllSales);
}

export default getManagerAllSalesSaga;