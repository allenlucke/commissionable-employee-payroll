import axios from 'axios';
import {takeLatest } from 'redux-saga/effects';

function* addSale(action) {
    console.log('In addSale');
    console.log(action.payload)
    try {
        yield axios({
            method: 'POST',
            url: '/api/salesperson/AddSale',
            data: action.payload
        })
    } catch(err) {
        console.log('Error posting sale', err);
    }
}
function* addSaleSaga() {
    yield takeLatest('ADD_SALE', addSale);
}
 
export default addSaleSaga;