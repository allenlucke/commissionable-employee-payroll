import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* changePassword(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.put('/api/user/change', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });
    
    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({type: 'SET_TO_LOGIN_MODE'});
  } catch (error) {
      console.log('Error with user registration:', error);
      yield put({type: 'REGISTRATION_FAILED'});
  }
}

function* changePasswordSaga() {
  yield takeLatest('CHANGE_PASSWORD', changePassword);
}

export default changePasswordSaga;
