import React, { Component } from 'react';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

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
        <form onSubmit={this.changePassword}>
          <h1>Change Password</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="confirmedPassword">
              Password:
              <input
                type="password"
                name="confirmedPassword"
                value={this.state.confirmedPassword}
                onChange={this.handleInputChangeFor('confirmedPassword')}
              />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ChangePasswordPage);

