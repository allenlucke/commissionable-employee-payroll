import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


// console.log(this.props.store.user)
class AdminAddEmployeePage extends Component {
    state = {
        heading: 'Admin Add Employee Page',
    };

    render() {
        return (
            <div>
                <h2>{this.state.heading}</h2>
                
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AdminAddEmployeePage);
