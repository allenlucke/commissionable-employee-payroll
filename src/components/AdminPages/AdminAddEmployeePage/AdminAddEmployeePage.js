import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './AdminAddEmployeePage.css'


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
                <form className="addEmpForm1" onSubmit={this.addNewEmployee}>
                    <TextField type='text' placeholder='First Name' value={this.state.newEmployee.firstName}
                    onChange={(event) => this.handleInputChange(event, 'firstName')}
                    variant="outlined" className="textFieldAddEmp"></TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField type='text' placeholder='Last Name' value={this.state.newEmployee.lastName}
                    onChange={(event) => this.handleInputChange(event, 'lastName')}
                    variant="outlined" className="textFieldAddEmp"></TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField type='text' placeholder='Username' value={this.state.newEmployee.username}
                    onChange={(event) => this.handleInputChange(event, 'username')}
                    variant="outlined" className="textFieldAddEmp"></TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField type='text' placeholder='Password' value={this.state.newEmployee.password}
                    onChange={(event) => this.handleInputChange(event, 'password')}
                    variant="outlined" className="textFieldAddEmp"></TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField type='email' placeholder='E-Mail' value={this.state.newEmployee.email}
                    onChange={(event) => this.handleInputChange(event, 'email')}
                    variant="outlined" className="textFieldAddEmp"></TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField type='text' placeholder='Position' value={this.state.newEmployee.position}
                    onChange={(event) => this.handleInputChange(event, 'position')}
                    variant="outlined" className="textFieldAddEmp"></TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField type='number' placeholder='Security Level' value={this.state.newEmployee.securityLevel}
                    onChange={(event) => this.handleInputChange(event, 'securityLevel')}
                    variant="outlined" className="textFieldAddEmp"></TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField type='text' placeholder='Hire Date' value={this.state.newEmployee.hireDate}
                    onChange={(event) => this.handleInputChange(event, 'hireDate')}
                    variant="outlined" className="textFieldAddEmp"></TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField type='number' placeholder='Base Salary' value={this.state.newEmployee.baseSalary}
                    onChange={(event) => this.handleInputChange(event, 'baseSalary')}
                    variant="outlined" className="textFieldAddEmp"></TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField type='number' placeholder='Team ID' value={this.state.newEmployee.team_id}
                    onChange={(event) => this.handleInputChange(event, 'team_id')}
                    variant="outlined" className="textFieldAddEmp"></TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type='submit' value='Add New Employee'
                    variant="contained" color="primary">Add New Employee</Button>
                </form>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AdminAddEmployeePage);