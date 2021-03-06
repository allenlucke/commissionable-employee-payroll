import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import moment from 'moment';
import Button from '@material-ui/core/Button';

class AdminRosterPage extends Component {
    state = {
        heading: 'Admin Roster Page',
        update: false,
    };
    
    componentDidMount() {
            this.props.dispatch({
            type: 'GET_ADMIN_ROSTER',
            payload: this.props.store.user
        })
    }
    deleteEmployee = (event, id) => {
        const empID = id;
        const userID = this.props.store.user.id;
        const userSecLvl = this.props.store.user.securityLevel;
        const empDeleteDataForServer = {
            empID: empID,
            userSecLvl: userSecLvl,
            userID: userID
        }
        this.props.dispatch({
            type: 'ADMIN_DELETE_EMP',
            payload: empDeleteDataForServer
        });
        this.props.dispatch({
            type: 'GET_ADMIN_ROSTER',
            payload: this.props.store.user
        });
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
                        <td>{moment(item.hireDate).format('LL')}</td>
                        <td>${item.baseSalary}</td>
                        <td>{item.bonusTier}</td>
                        <td>{item.team_id}</td>
                        <td>{item.teamName}</td>                
                        <td><Button onClick={(event) =>this.deleteEmployee(event, item.id)}
                            variant="contained" color="secondary">Terminate</Button></td>
                    </tr>
                </tbody>
            )
        })
        return (
            <div className= "container">
                
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
