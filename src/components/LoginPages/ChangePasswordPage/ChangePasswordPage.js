import React, { Component } from 'react';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { TextField, Button } from '@material-ui/core';
import './../LoginPage/LoginPage.css'

class ChangePasswordPage extends Component {
  state = {
    username: '',
    password: '',
    confirmedPassword: '',
  };

  changePassword = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password === this.state.confirmedPassword) {
      this.props.dispatch({
        type: 'CHANGE_PASSWORD',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      this.props.history.push('/login');
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className= "container">
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form className="loginForm2" onSubmit={this.changePassword}>
          <h2>Change Password</h2>
              <TextField
                type="text"
                name="username"
                placeholder='Username'
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                variant="outlined" className="textField"
              ></TextField>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <TextField
                type="password"
                name="password"
                placeholder="New Password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                variant="outlined" className="textField"
              ></TextField>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <TextField
                type="password"
                name="confirmedPassword"
                placeholder="Confirm New Password"
                value={this.state.confirmedPassword}
                onChange={this.handleInputChangeFor('confirmedPassword')}
                variant="outlined" className="textField"
              ></TextField>
              &nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              className="register"
              type="submit"
              name="submit"
              value="Submit"
              variant="contained" color="primary">Submit</Button>
        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ChangePasswordPage);

