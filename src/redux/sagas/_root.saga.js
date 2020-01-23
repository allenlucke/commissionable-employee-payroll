import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import changePasswordSaga from './changePassword.saga';
import getAdminAllSalesSaga from './getAdminAllSales.saga';
import getAdminTotalTeamSalesSaga from './getAdminTotalTeamSales.saga';
import getAdminRosterSaga from './getAdminRoster.saga';
import getAdminSalesByEmpSaga from './getAdminSalesByEmp.saga';
import addEmployeeSaga from './addEmployee.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    changePasswordSaga(),
    userSaga(),
    getAdminAllSalesSaga(),
    getAdminTotalTeamSalesSaga(),
    getAdminSalesByEmpSaga(),
    getAdminRosterSaga(),
    addEmployeeSaga(),
  ]);
}
