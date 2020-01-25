import { all } from 'redux-saga/effects';
import loginSaga from './userSagas/login.saga';
import registrationSaga from './userSagas/registration.saga';
import userSaga from './userSagas/user.saga';
import changePasswordSaga from './userSagas/changePassword.saga';
import getAdminAllSalesSaga from './adminSagas/getAdminAllSales.saga';
import getAdminTotalTeamSalesSaga from './adminSagas/getAdminTotalTeamSales.saga';
import getAdminRosterSaga from './adminSagas/getAdminRoster.saga';
import getAdminSalesByEmpSaga from './adminSagas/getAdminSalesByEmp.saga';
import addEmployeeSaga from './adminSagas/addEmployee.saga';
import deleteAdminRosterSaga from './adminSagas/deleteAdminRoster.saga ';
import getSalespersonHomePageSaga from './salespersonSagas/getSalespersonHomePage.saga';
import addSaleSaga from './salespersonSagas/addSale.saga';
import getSalespersonViewSalesSaga from './salespersonSagas/getSalespersonViewSales.saga';
import getManagerHomePageSaga from './managerSagas/getManagerHomePage.saga';
import getManagerAllSalesSaga from './managerSagas/getManagerAllSales.saga';

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
    deleteAdminRosterSaga(),
    getSalespersonHomePageSaga(),
    addSaleSaga(),
    getSalespersonViewSalesSaga(),
    getManagerHomePageSaga(),
    getManagerAllSalesSaga(),
  ]);
}
