import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


// console.log(this.props.store.user)
class AdminRosterPage extends Component {
    state = {
        heading: 'Admin Roster Page',
    };
    
    componentDidMount() {
            this.props.dispatch({
            type: 'GET_ADMIN_ROSTER',
            payload: this.props.store.user
        })
    }
    //Need to set up saga and reducer for delete
    deleteEmployee = (event, id) => {
        this.props.dispatch({
            type: 'ADMIN_DELETE_EMP',
            payload: this.props.user + id 
            
        })
    }
    render() {
        const roster = this.props.store.getAdminRosterReducer.map((item, index) => {
            return(
                <tbody key={index}>
                    <tr >
                        <td>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.position}</td>
                        <td>{item.securityLevel}</td>
                        <td>{item.hireDate}</td>
                        <td>{item.baseSalary}</td>
                        <td>{item.bonusTier}</td>
                        <td>{item.team_id}</td>
                        <td>{item.teamName}</td>                
                        <td><button onClick={(event) =>this.deleteEmployee(event, item.id)}>
                        Terminate</button></td>
                    </tr>
                </tbody>
            )
        })
        return (
            <div>
                
                <h2>{this.state.heading}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Position</th>
                            <th>Security Level</th>
                            <th>Hire Date</th>
                            <th>Base Salary</th>
                            <th>Bonus Tier</th>
                            <th>Team ID</th>
                            <th>Team Name</th>
                            <th>Terminate Employee</th>
                        </tr>
                    </thead>
                        {roster}
                </table>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AdminRosterPage);
