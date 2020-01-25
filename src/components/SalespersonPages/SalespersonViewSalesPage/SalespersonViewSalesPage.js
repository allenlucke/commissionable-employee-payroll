import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';


class SalespersonViewSalesPage extends Component {
    state = {
        heading: 'Salesperson View Sales Page',
    };
    
    componentDidMount() {
            this.props.dispatch({
            type: 'GET_SALESPERSON_ALL_SALES',
            payload: this.props.store.user
        })
    }

    render() {
        const allSalesList = this.props.store.getSalespersonViewSalesReducer.map((item, index) => {
            return(
                <tbody key={index}>
                    <tr>
                        <td>{item.transactionNumber}</td>
                        <td>{item.salesID}</td>
                        <td>{item.orderDate}</td>
                        <td>{item.productName}</td>
                        <td>{item.unitsSold}</td>
                        <td>{item.costPerUnit}</td>
                        <td>{item.pricePerUnit}</td>
                        <td>{item.extendedPrice}</td>
                        <td>{item.estCommission}</td>
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
                            <th>Transaction Number</th>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Cost Per Unit</th>
                            <th>Price Per Unit</th>
                            <th>Extended Price</th>
                            <th>Approximate Commission</th>
                        </tr>
                    </thead>
                        {allSalesList}
                </table>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(SalespersonViewSalesPage);
