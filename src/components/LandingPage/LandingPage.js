import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from '@material-ui/core/Button';
import './LandingPage.css';

class LandingPage extends Component {
    state = {
        heading: 'Welcome To Our Company',
    };

    onLogin = (event) => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="container">
                <h2>{this.state.heading}</h2>
                <div className="grid">
                    <div className="grid-col grid-col_8">
                        <p>Welcome to our company. To arrive at your desired destination, please select one of the links in the navigation bar.</p>
                    </div>
                    <div className="grid-col grid-col_4">
                        
                        <Button
                            className="btn btn_sizeFull"
                            onClick={this.onLogin}
                            variant="contained" color="primary">
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(LandingPage);
