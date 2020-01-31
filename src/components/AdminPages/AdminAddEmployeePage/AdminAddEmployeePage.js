import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


// console.log(this.props.store.user)
class AdminAddEmployeePage extends Component {
    state = {
        heading: 'Admin Add Employee Page',
        newEmployee: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            position: '',
            securityLevel: '',
            hireDate: '',
            baseSalary: '',
            team_id: '',
        }
    };
    handleInputChange = (event, inputKey) => {
        this.setState({
            newEmployee: {
                ...this.state.newEmployee,
                [inputKey]: event.target.value
            }
        });
    }
    addNewEmployee = (event, inputKey) => {
        const empToAdd = this.state.newEmployee;
        const userInfo = this.props.store.user;
        const userSecurityLevel = userInfo.securityLevel;
        const userID = userInfo.id;
        const newEmpDataForServer = {
            ...empToAdd,
            userSecurityLevel: userSecurityLevel,
            userID: userID
        }
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_EMPLOYEE',
            payload: newEmpDataForServer              
        })
            this.setState({
                newEmployee: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                email: '',
                position: '',
                securityLevel: '',
                hireDate: '',
                baseSalary: '',
                team_id: '',
                }
            })
        }
    render() {
        return (
            <div className= "container">
                <h2>{this.state.heading}</h2>
                <form onSubmit={this.addNewEmployee}>
                    <TextField type='text' placeholder='First Name' value={this.state.newEmployee.firstName}
                    onChange={(event) => this.handleInputChange(event, 'firstName')}
                    variant="filled" className="textField"></TextField>
                    <TextField type='text' placeholder='Last Name' value={this.state.newEmployee.lastName}
                    onChange={(event) => this.handleInputChange(event, 'lastName')}
                    variant="filled" className="textField"></TextField>
                    <TextField type='text' placeholder='Username' value={this.state.newEmployee.username}
                    onChange={(event) => this.handleInputChange(event, 'username')}
                    variant="filled" className="textField"></TextField>
                    <TextField type='text' placeholder='Password' value={this.state.newEmployee.password}
                    onChange={(event) => this.handleInputChange(event, 'password')}
                    variant="filled" className="textField"></TextField>
                    <TextField type='email' placeholder='E-Mail' value={this.state.newEmployee.email}
                    onChange={(event) => this.handleInputChange(event, 'email')}
                    variant="filled" className="textField"></TextField>
                    <TextField type='text' placeholder='Position' value={this.state.newEmployee.position}
                    onChange={(event) => this.handleInputChange(event, 'position')}
                    variant="filled" className="textField"></TextField>
                    <TextField type='number' placeholder='Security Level' value={this.state.newEmployee.securityLevel}
                    onChange={(event) => this.handleInputChange(event, 'securityLevel')}
                    variant="filled" className="textField"></TextField>
                    <TextField type='text' placeholder='Hire Date' value={this.state.newEmployee.hireDate}
                    onChange={(event) => this.handleInputChange(event, 'hireDate')}
                    variant="filled" className="textField"></TextField>
                    <TextField type='number' placeholder='Base Salary' value={this.state.newEmployee.baseSalary}
                    onChange={(event) => this.handleInputChange(event, 'baseSalary')}
                    variant="filled" className="textField"></TextField>
                    <TextField type='number' placeholder='Team ID' value={this.state.newEmployee.team_id}
                    onChange={(event) => this.handleInputChange(event, 'team_id')}
                    variant="filled" className="textField"></TextField>
                    <Button type='submit' value='Add New Employee'
                    variant="contained" color="primary">Add New Employee</Button>
                </form>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AdminAddEmployeePage);
