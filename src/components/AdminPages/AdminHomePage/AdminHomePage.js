import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';


// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace 
// the component name TemplateClass with the name for the new 
// component.
class AdminHomePage extends Component {
    state = {
        heading: 'Admin Home Page',
    };

    render() {
        
        return (
            <div>
                <h2>{this.state.heading}</h2>

                <p>Hello, {this.props.store.user.firstName}</p>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AdminHomePage);
