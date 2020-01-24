import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


// console.log(this.props.store.user)
class SalespersonAddSalePage extends Component {
    state = {
        heading: 'Salesperson Add Sale Page',
        newSale: {
            product_id: '',
            unitsSold: '',
            transactionNumber: '',
            date: '',
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
        const saleToAdd = this.state.newSale;
        const userInfo = this.props.store.user;
        const userSecurityLevel = userInfo.securityLevel;
        const userID = userInfo.id;
        const newSaleDataForServer = {
            ...saleToAdd,
            userSecurityLevel: userSecurityLevel,
            userID: userID
        }
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_EMPLOYEE',
            payload: newSaleDataForServer              
        })
            this.setState({
                newSale: {
                    product_id: '',
                    unitsSold: '',
                    transactionNumber: '',
                    date: '',
                }
            })
        }
    render() {
        return (
            <div>
                <h2>{this.state.heading}</h2>
                <form onSubmit={this.addNewEmployee}>
                    <input type='text' placeholder='Product' value={this.state.newSale.product_id}
                    onChange={(event) => this.handleInputChange(event, 'product_id')} />
                    <input type='text' placeholder='Quantity' value={this.state.newSale.unitsSold}
                    onChange={(event) => this.handleInputChange(event, 'unitsSold')} />
                    <input type='text' placeholder='Transaction Number' value={this.state.newSale.transactionNumber}
                    onChange={(event) => this.handleInputChange(event, 'transactionNumber')} />
                    <input type='text' placeholder='Date' value={this.state.newSale.date}
                    onChange={(event) => this.handleInputChange(event, 'date')} />
                    <input type='submit' value='Add Sale' />
                </form>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(SalespersonAddSalePage);
