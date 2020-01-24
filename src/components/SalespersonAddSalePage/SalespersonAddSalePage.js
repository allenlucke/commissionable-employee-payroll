import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


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
            newSale: {
                ...this.state.newSale,
                [inputKey]: event.target.value
            }
        });
    }
    addNewEmployee = (event, inputKey) => {
        const saleToAdd = this.state.newSale;
        const userInfo = this.props.store.user;
        const userSecLvl = userInfo.securityLevel;
        const userID = userInfo.id;
        const newSaleDataForServer = {
            ...saleToAdd,
            userSecLvl: userSecLvl,
            userID: userID
        }
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_SALE',
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
                    <input type='submit' value='Submit' />
                </form>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(SalespersonAddSalePage);