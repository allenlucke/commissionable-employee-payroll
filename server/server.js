
const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// ROUTES IMPORTS
// const userRouter = require('./routes/user.router');
const logInRouter = require('./routes/login.router/login.router');
const changePasswordRouter = require('./routes/login.router/changePassword.router');
//Admin Routes
// const adminRouter = require('./routes/admin.router');
const adminHomePageRouter = require('./routes/admin.router/adminHomePage.router');
const adminAllSalesPageRouter = require('./routes/admin.router/adminAllSalesPage.router');
const adminTeamSalesPageRouter = require('./routes/admin.router/adminTeamSalesPage.router');
const adminRosterPageRouter = require('./routes/admin.router/adminRosterPage.router');
const adminAddEmployeePageRouter = require('./routes/admin.router/adminAddEmployeePage.router');
//Salesperson Routes
const salesPersonHomePageRouter = require('./routes/salesperson.router/salespersonHomePage.router');
const salesPersonViewSalesPageRouter = require('./routes/salesperson.router/salespersonViewSalesPage.router');
const salespersonAddSaleRouter = require('./routes/salesperson.router/salespersonAddSalesPage.router');
//Manager Routes
const managerHomePageRouter = require('./routes/manager.router/managerHomePage.router');
const managerAllSalesPageRouter = require('./routes/manager.router/managerAllSales.router');
const managerTeamSalesPageRouter = require('./routes/manager.router/managerTeamSales.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* ROUTES */
//User Routes
// app.use('/api/user', userRouter);
app.use('/api/user', logInRouter);
// app.use('/api/user/change', changePasswordRouter);
//Admin Routes
app.use('/api/admin', adminHomePageRouter);
app.use('/api/admin/allSales', adminAllSalesPageRouter);
app.use('/api/admin/teamSales', adminTeamSalesPageRouter);
app.use('/api/admin/roster', adminRosterPageRouter);
app.use('/api/admin/postEmp', adminAddEmployeePageRouter);
// //Salesperson Routes//
app.use('/api/salesperson/AddSale', salespersonAddSaleRouter);
app.use('/api/salesperson', salesPersonHomePageRouter);
app.use('/api/salesperson/Sales', salesPersonViewSalesPageRouter);
// //Manager Routes//
app.use('/api/manager', managerHomePageRouter);
app.use('/api/manager/AllSales', managerAllSalesPageRouter);
app.use('/api/manager/teamSales', managerTeamSalesPageRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
