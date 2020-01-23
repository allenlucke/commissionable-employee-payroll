import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace 
// the component name TemplateClass with the name for the new 
// component.
class SalespersonHomePage extends Component {
    state = {
        heading: 'Salesperson Home Page',
    };

    componentDidMount() {
        this.props.dispatch({
        type: 'GET_SALESPERSON_HOMEPAGE',
        payload: this.props.store.user 
    })
}
    render() {
        const teamName = this.props.store.getSalespersonHomePageReducer.map((item, index) => {
            console.log(item.teamName)
            return(
                <div key={index}>
                    <p>Your Team is: {item.teamName}</p>
                </div>
            )
        })
        return (
            <div>
                <h2>{this.state.heading}</h2>
                <p>Hello, {this.props.store.user.firstName}</p>
                {teamName}
            </div>
        );
    }
}

export default connect(mapStoreToProps)(SalespersonHomePage);
