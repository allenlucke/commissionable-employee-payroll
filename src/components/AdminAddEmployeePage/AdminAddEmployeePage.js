import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


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
            securityLevel: 0,
            hireDate: '',
            baseSalary: 0,
            team_id: 0,
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
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_EMPLOYEE',
            payload: this.state.newEmployee 
        })
            this.setState({
                newEmployee: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                email: '',
                position: '',
                securityLevel: 0,
                hireDate: '',
                baseSalary: 0,
                team_id: 0,
                }
            })
        }
    render() {
        return (
            <div>
                <h2>{this.state.heading}</h2>
                <form onSubmit={this.addNewEmployee}>
                    <input type='text' placeholder='First Name' value={this.state.newEmployee.firstName}
                    onChange={(event) => this.handleInputChange(event, 'firstName')} />
                    <input type='text' placeholder='Last Name' value={this.state.newEmployee.lastName}
                    onChange={(event) => this.handleInputChange(event, 'lastName')} />
                    <input type='text' placeholder='Username' value={this.state.newEmployee.username}
                    onChange={(event) => this.handleInputChange(event, 'username')} />
                    <input type='text' placeholder='Password' value={this.state.newEmployee.password}
                    onChange={(event) => this.handleInputChange(event, 'password')} />
                    <input type='text' placeholder='E-Mail' value={this.state.newEmployee.email}
                    onChange={(event) => this.handleInputChange(event, 'email')} />
                    <input type='text' placeholder='Position' value={this.state.newEmployee.position}
                    onChange={(event) => this.handleInputChange(event, 'position')} />
                    <input type='number' placeholder='Security Level' value={this.state.newEmployee.securityLevel}
                    onChange={(event) => this.handleInputChange(event, 'securityLevel')} />
                    <input type='text' placeholder='Hire Date' value={this.state.newEmployee.hireDate}
                    onChange={(event) => this.handleInputChange(event, 'hireDate')} />
                    <input type='number' placeholder='Base Salary' value={this.state.newEmployee.baseSalary}
                    onChange={(event) => this.handleInputChange(event, 'baseSalary')} />
                    <input type='number' placeholder='Team ID' value={this.state.newEmployee.team_id}
                    onChange={(event) => this.handleInputChange(event, 'team_id')} />
                    <input type='submit' value='Add New Employee' />
                </form>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AdminAddEmployeePage);
