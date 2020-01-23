import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getSalespersonHomePage(action) {
    console.log(action.payload);
    const userID = action.payload.id;
    const userSecLvl = action.payload.securityLevel;
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/admin/teamSales/empSales/' + userSecLvl + '/' + userID,  
        })
        yield put({
            type: 'SET_ADMIN_SALES_BY_EMPLOYEE',
            payload: response.data
        });
    } catch(err) {
        console.log('Error fetching all sales', err);
    }
}
function* getSalespersonHomePageSaga() {
    yield takeLatest('GET_ADMIN_SALES_BY_EMPLOYEE', getSalespersonHomePage);
}

export default getSalespersonHomePageSaga;