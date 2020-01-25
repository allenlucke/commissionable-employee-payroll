import { combineReducers } from 'redux';
import errors from './userReducers/errors.reducer';
import loginMode from './userReducers/loginMode.reducer';
import user from './userReducers/user.reducer';
import getAdminAllSalesReducer from './adminReducers/getAdminAllSales.reducer';
import getAdminTotalTeamSalesReducer from './adminReducers/getAdminTotalTeamSales.reducer';
import getAdminSalesByEmpReducer from './adminReducers/getAdminSalesByEmp.reducer';
import getAdminRosterReducer from './adminReducers/getAdminRoster.reducer';
import getSalespersonHomePageReducer from './salespersonReducers/getSalespersonHomePage.reducer';
import getSalespersonViewSalesReducer from './salespersonReducers/getSalespersonViewSales.reducer';
import getManagerHomePageReducer from './managerReducers/getManagerHomePage.reducer';
import getManagerAllSalesReducer from './managerReducers/getManagerAllSales.reducer';
import getManagerSalesByEmpReducer from './managerReducers/getManagerSalesByEmp.reducer';
import getManagerTotalTeamSalesReducer from './managerReducers/getManagerTotalTeamSales.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  getAdminAllSalesReducer,
  getAdminTotalTeamSalesReducer,
  getAdminSalesByEmpReducer,
  getAdminRosterReducer,
  getSalespersonHomePageReducer,
  getSalespersonViewSalesReducer,
  getManagerHomePageReducer,
  getManagerAllSalesReducer,
  getManagerSalesByEmpReducer,
  getManagerTotalTeamSalesReducer,
});

export default rootReducer;
