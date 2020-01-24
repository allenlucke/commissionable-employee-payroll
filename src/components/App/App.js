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
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import ChangePasswordPage from '../ChangePasswordPage/ChangePasswordPage';
import AdminHomePage from '../AdminHomePage/AdminHomePage';
import AdminAllSalesPage from '../AdminAllSalesPage/AdminAllSalesPage';
import AdminTeamSalesPage from '../AdminTeamSalesPage/AdminTeamSalesPage';
import AdminRosterPage from '../AdminRosterPage/AdminRosterPage';
import AdminAddEmployeePage from '../AdminAddEmployeePage/AdminAddEmployeePage';
import SalespersonHomePage from '../SalespersonHomePage/SalespersonHomePage';
import SalespersonAddSalePage from '../SalespersonAddSalePage/SalespersonAddSalePage';
import SalespersonViewSalesPage from '../SalespersonViewSalesPage/SalespersonViewSalesPage';
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
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
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
              // authRedirect="/admin"
              component={ChangePasswordPage}
            />
            <ProtectedRoute
              exact
              path="/adminHome"
              // authRedirect="/admin"
              component={AdminHomePage}
            />
            <ProtectedRoute
              exact
              path="/adminAllSales"
              // authRedirect="/admin"
              component={AdminAllSalesPage}
            />
            <ProtectedRoute
              exact
              path="/adminTeamSales"
              // authRedirect="/admin"
              component={AdminTeamSalesPage}
            />
            <ProtectedRoute
              exact
              path="/adminRoster"
              // authRedirect="/admin"
              component={AdminRosterPage}
            />
            <ProtectedRoute
              exact
              path="/adminAddEmp"
              // authRedirect="/admin"
              component={AdminAddEmployeePage}
            />
            <ProtectedRoute
              exact
              path="/salespersonHomePage"
              // authRedirect="/admin"
              component={SalespersonHomePage}
            />
            <ProtectedRoute
              exact
              path="/salespersonAddSalePage"
              // authRedirect="/admin"
              component={SalespersonAddSalePage}
            />
            <ProtectedRoute
              exact
              path="/salespersonViewSalesPage"
              // authRedirect="/admin"
              component={SalespersonViewSalesPage}
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
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will be redirected to the authRedirect path provided. */}
            <ProtectedRoute
              exact
              path="/login"
              authRedirect="/admin"
              component={LoginPage}
            />
            {/* <ProtectedRoute
              exact
              path="/registration"
              authRedirect="/admin"
              component={RegisterPage}
            /> */}
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
