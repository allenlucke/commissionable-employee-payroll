import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './LoginPage.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    userSecurityLevel: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
          userSecurityLevel: this.state.userSecurityLevel,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
      this.props.history.push('/home');
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className= "container">
        {this.props.store.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.store.errors.loginMessage}
          </h2>
        )}
        <form className="loginForm1" onSubmit={this.login}>
          <h1>Login</h1>
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
                placeholder='Password'
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                variant="outlined" className="textField"
              ></TextField>
              &nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
              variant="contained" color="primary">Log-In</Button>
        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
