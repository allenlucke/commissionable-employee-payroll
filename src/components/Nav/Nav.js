import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LoginPages/LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">Prime Solo Project - Commissionable Payroll App</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login' if they are not */}
        {props.store.user.id ? 'Landing Page' : 'Login'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      
      {props.store.user.id && (
        <>
          {props.store.user.securityLevel  >= 10 && (
          <>
          <Link className="nav-link" to="/adminHome">
            Admin Home Page
          </Link>
          <Link className="nav-link" to="/adminTeamSales">
            Admin Team Sales Page
          </Link>
          <Link className="nav-link" to="/adminAllSales">
            Admin All Sales Page
          </Link>
          <Link className="nav-link" to="/adminRoster">
            Admin Roster Page
          </Link>
          
          <Link className="nav-link" to="/adminAddEmp">
            Admin Add Employee
          </Link>
          </>
          )}
          {props.store.user.securityLevel  <= 4 && (
            <>
          <Link className="nav-link" to="/salespersonHomePage">
            Salesperson Home Page
          </Link>
          <Link className="nav-link" to="/salespersonAddSalePage">
            Salesperson Add Sale Page
          </Link>
          <Link className="nav-link" to="/salespersonViewSalesPage">
            Salesperson View Sales Page
          </Link>
            </>
          )}
          {props.store.user.securityLevel === 5 && (
            <>
            <Link className="nav-link" to="/managerHomePage">
            Manager Home Page
            </Link>
            </>
          )}
          <Link className="nav-link" to="/change">
            Change Password
          </Link>
          <LogOutButton className="nav-link"/>

        </>
      )}
      {/* Always show this link since the about page is not protected */}
      {/* <Link className="nav-link" to="/about">
        About
      </Link> */}
    </div>
  </div>
);

export default connect(mapStoreToProps)(Nav);
