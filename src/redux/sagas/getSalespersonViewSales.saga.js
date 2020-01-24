import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getSalespersonViewSales(action) {
    console.log(action.payload);
    const id = action.payload.id;
    const userSecLvl = action.payload.securityLevel;
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/salesperson/Sales/' + userSecLvl + '/' + id, 
        })
        yield put({
            type: 'SET_SALESPERSON_ALL_SALES',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching view sales', err);
    }
}
function* getSalespersonViewSalesSaga() {
    yield takeLatest('GET_SALESPERSON_ALL_SALES', getSalespersonViewSales);
}

export default getSalespersonViewSalesSaga;