import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* addEmployee(action) {
    console.log('In addEmployee');
    console.log(action.payload)
    try {
        yield axios({
            method: 'POST',
            url: '/api/admin/postEmp',
            data: action.payload
        })
    } catch(err) {
        console.log('Error posting employee', err);
    }
}
function* addEmployeeSaga() {
    yield takeLatest('ADD_EMPLOYEE', addEmployee);
}
 
export default addEmployeeSaga;