import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


// console.log(this.props.store.user)
class AdminAllSalesPage extends Component {
    state = {
        heading: 'Class Component',
    };
    
    componentDidMount() {
            this.props.dispatch({
            type: 'GET_ADMIN_ALL_SALES',
            payload: this.props.store.user
        })
    }

    render() {
        const allSalesList = this.props.store.getAdminAllSalesReducer.map((item, index) => {
            return(
                <tbody key={index}>
                    <tr>
                        <td>{item.empid}</td>
                        <td>{item.team_id}</td>
                        <td>{item.lastName}</td>
                        <td>{item.bonusTier}</td>
                        <td>{item.transactionNumber}</td>
                        <td>{item.salesID}</td>
                        <td>{item.orderDate}</td>
                        <td>{item.productName}</td>
                        <td>{item.unitsSold}</td>
                        <td>{item.costPerUnit}</td>
                        <td>{item.pricePerUnit}</td>
                        <td></td>
                        <td>{item.commission}</td>
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
                            <th>Team ID</th>
                            <th>Employee Last Name</th>
                            <th>Employee Tier</th>
                            <th>Transaction Number</th>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Product Name</th>
                            <th>Cost Per Unit</th>
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

export default connect(mapStoreToProps)(AdminAllSalesPage);
