import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
// import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPages/LoginPage/LoginPage';
import ChangePasswordPage from '../LoginPages/ChangePasswordPage/ChangePasswordPage';
//Admin Pages
import AdminHomePage from '../AdminPages/AdminHomePage/AdminHomePage';
import AdminAllSalesPage from '../AdminPages/AdminAllSalesPage/AdminAllSalesPage';
import AdminTeamSalesPage from '../AdminPages/AdminTeamSalesPage/AdminTeamSalesPage';
import AdminRosterPage from '../AdminPages/AdminRosterPage/AdminRosterPage';
import AdminAddEmployeePage from '../AdminPages/AdminAddEmployeePage/AdminAddEmployeePage';
//Salesperson Pages
import SalespersonHomePage from '../SalespersonPages/SalespersonHomePage/SalespersonHomePage';
import SalespersonAddSalePage from '../SalespersonPages/SalespersonAddSalePage/SalespersonAddSalePage';
import SalespersonViewSalesPage from '../SalespersonPages/SalespersonViewSalesPage/SalespersonViewSalesPage';
//Manager Pages
import ManagerHomePage from '../ManagerPages/ManagerHomePage/ManagerHomePage';
import ManagerAllSalesPage from '../ManagerPages/ManagerAllSalesPage/ManagerAllSalesPage';
import ManagerTeamSalesPage from '../ManagerPages/ManagerTeamSalesPage/ManagerTeamSalesPage';
import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/login */}
            <Redirect exact from="/" to="/login" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            <Route
              exact
              path="/home"
              component={LandingPage}
            />
            <ProtectedRoute
              exact
              path="/change"
              component={ChangePasswordPage}
            />
            <ProtectedRoute
              exact
              path="/adminHome"
              component={AdminHomePage}
            />
            <ProtectedRoute
              exact
              path="/adminAllSales"
              component={AdminAllSalesPage}
            />
            <ProtectedRoute
              exact
              path="/adminTeamSales"
              component={AdminTeamSalesPage}
            />
            <ProtectedRoute
              exact
              path="/adminRoster"
              component={AdminRosterPage}
            />
            <ProtectedRoute
              exact
              path="/adminAddEmp"
              component={AdminAddEmployeePage}
            />
            <ProtectedRoute
              exact
              path="/salespersonHomePage"
              component={SalespersonHomePage}
            />
            <ProtectedRoute
              exact
              path="/salespersonAddSalePage"
              component={SalespersonAddSalePage}
            />
            <ProtectedRoute
              exact
              path="/salespersonViewSalesPage"
              component={SalespersonViewSalesPage}
            />
            <ProtectedRoute
              exact
              path="/managerHomePage"
              component={ManagerHomePage}
            />
            <ProtectedRoute
              exact
              path="/managerAllSales"
              component={ManagerAllSalesPage}
            />
            <ProtectedRoute
              exact
              path="/managerTeamSales"
              component={ManagerTeamSalesPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              exact
              path="/admin"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            {/* <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            /> */}
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will be redirected to the authRedirect path provided. */}
            <ProtectedRoute
              exact
              path="/login"
              authRedirect="/admin"
              component={LoginPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
