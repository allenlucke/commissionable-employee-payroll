import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { MenuItem, Select, Button, TextField, InputLabel, FormControl } from '@material-ui/core';


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
    addSale = (event, inputKey) => {
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
            <div className= "container">
                <h2>{this.state.heading}</h2>
                <form className="salesForm1" onSubmit={this.addSale}>
                    <Select style={{height: '5.8vh', width: '20%' }} onChange={(event) => this.handleInputChange(event, this.state.newSale.product_id = event.target.value )}
                      className="dropBox">
                        <MenuItem value='1'>Product1</MenuItem>
                        <MenuItem value='2'>Product2</MenuItem>
                        <MenuItem value='3'>Product3</MenuItem> 
                    </Select>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField type='number' placeholder='Quantity' value={this.state.newSale.unitsSold}
                    onChange={(event) => this.handleInputChange(event, 'unitsSold')}
                    variant="outlined" className="textField"></TextField>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField type='text' placeholder='Transaction Number' value={this.state.newSale.transactionNumber}
                    onChange={(event) => this.handleInputChange(event, 'transactionNumber')}
                    variant="outlined" className="textField"></TextField>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField type='date' placeholder='Date' value={this.state.newSale.date}
                    onChange={(event) => this.handleInputChange(event, 'date')}
                    variant="outlined" className="textField"></TextField>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type='submit' value='Submit' 
                    variant="contained" color="primary">Submit</Button>
                </form>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(SalespersonAddSalePage);
