import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import currencyFormatter from 'currency-formatter';

class ManagerTeamSalesPage extends Component {
    state = {
        heading1: 'Manager Team Sales Page',
        heading2: 'Sales By Employee',
        heading3: 'Total Team Sales'
    };
    
    componentDidMount() {
            this.props.dispatch({
            type: 'GET_MANAGER_SALES_BY_EMPLOYEE',
            payload: this.props.store.user
        })
            this.props.dispatch({
            type: 'GET_MANAGER_TOTAL_TEAM_SALES',
            payload: this.props.store.user
        })
    }

    render() {
        
        const salesByEmpList = this.props.store.getManagerSalesByEmpReducer.map((item, index) => {
            const productsSoldList = item.products;
            const productId1QuantityList = productsSoldList.filter((item) => {
                return item.productID === 1;
            });
            const productId2QuantityList = productsSoldList.filter((item) => {
                return item.productID === 2;
            });
            const productId3QuantityList = productsSoldList.filter((item) => {
                return item.productID === 3;
            });
            return(
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.lastName}</td>
                    <td>{item.bonusTier}</td>
                    <td>{productId1QuantityList.length > 0 ? productId1QuantityList[0].productsSold : 0}</td>
                    <td>{productId2QuantityList.length > 0 ? productId2QuantityList[0].productsSold : 0}</td>
                    <td>{productId3QuantityList.length > 0 ? productId3QuantityList[0].productsSold : 0}</td>
                    <td>{item.productsSold}</td>
                    <td>${item.total_sales}</td>
                    <td>${currencyFormatter.format(item.totalTeamCommissions, 'USD')}</td>
                </tr>
        )
        })
        const totalTeamSalesList = this.props.store.getManagerTotalTeamSalesReducer.map((item, index) => {
            const productsSoldList = item.products;
            const productId1QuantityList = productsSoldList.filter((item) => {
                return item.productID === 1;
            });
            const productId2QuantityList = productsSoldList.filter((item) => {
                return item.productID === 2;
            });
            const productId3QuantityList = productsSoldList.filter((item) => {
                return item.productID === 3;
            });
            return(
                            <tr key={index}>
                                <td>{item.team_id}</td>
                                <td>{item.teamName}</td>
                                <td>{item.lastName}</td>
                                <td>{currencyFormatter.format(item.avgTier, 'USD')}</td>
                                <td>{productId1QuantityList.length > 0 ? productId1QuantityList[0].productsSold : 0}</td>
                                <td>{productId2QuantityList.length > 0 ? productId2QuantityList[0].productsSold : 0}</td>
                                <td>{productId3QuantityList.length > 0 ? productId3QuantityList[0].productsSold : 0}</td>
                                <td>{item.productsSoldPerTeam}</td>
                                <td>${item.salesPerTeam}</td>
                                <td>${currencyFormatter.format(item.totalTeamCommissions, 'USD')}</td>
                            </tr>
                    )
        })
        return (
            <div>
                
                <h2>{this.state.heading1}</h2>
                <h3>{this.state.heading2}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Last Name</th>
                            <th>Bonus Tier</th>
                            <th>Product1</th>
                            <th>Product2</th>
                            <th>Product3</th>
                            <th>Total Products</th>
                            <th>Total Sales</th>
                            <th>Total Commissions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {salesByEmpList}
                    </tbody>    
                </table>
                <h3>{this.state.heading3}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Team ID</th>
                            <th>Team Name</th>
                            <th>Manager Last Name</th>
                            <th>Avg Tier</th>
                            <th>Product1</th>
                            <th>Product2</th>
                            <th>Product3</th>
                            <th>Total Products</th>
                            <th>Total Sales</th>
                            <th>Total Commissions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {totalTeamSalesList}
                    </tbody>    
                </table>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(ManagerTeamSalesPage);
