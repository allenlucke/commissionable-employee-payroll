import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


// console.log(this.props.store.user)
class AdminAllSalesPage extends Component {
    state = {
        heading: 'Admin Team Sales Page',
        
    };
    
    componentDidMount() {
            this.props.dispatch({
            type: 'GET_ADMIN_TOTAL_TEAM_SALES',
            payload: this.props.store.user
        })
    }

    render() {
        JSON.stringify(this.props.store.getAdminTotalTeamSalesReducer.teamNameManager)
        // const teamSalesList = this.props.store.getAdminTotalTeamSalesReducer.map((item, index) => {
        //     return(
        //         <tbody key={index}>
        //             <tr>
        //                 <td>{item.team_id}</td>
        //                 <td>{item.teamName}</td>
        //                 <td>{item.lastName}</td> 
        //             </tr>
        //         </tbody>
        //     )
        // })
        return (
            <div>
                
                <h2>{this.state.heading}</h2>
                <h3>${JSON.stringify(this.props.store.getAdminTotalTeamSalesReducer)}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Team ID</th>
                            <th>Team Name</th>
                            <th>Manager Last</th>
                            <th>Average Tier</th>
                            <th>Product1</th>
                            <th>Product2</th>
                            <th>Product3</th>
                            <th>Total Products</th>
                            <th>Total Sales</th>
                            <th>Total Commissions</th>
                        </tr>
                    </thead>
                        {/* {teamSalesList} */}
                </table>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AdminAllSalesPage);
