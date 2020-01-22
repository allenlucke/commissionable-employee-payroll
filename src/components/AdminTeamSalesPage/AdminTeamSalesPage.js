import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// const mapStateToProps = reduxState => ({
//     reduxState,
// })

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
        // let mgrArray = this.props.store.getAdminTotalTeamSalesReducer.teamNameManager;
        // let thirdArray = this.props.store.getAdminTotalTeamSalesReducer.teamSalesTotal;
        // console.log(JSON.stringify(this.props.store.getAdminTotalTeamSalesReducer.teamNameManager))
        // JSON.stringify(this.props.store.getAdminTotalTeamSalesReducer.teamNameManager)
        // console.log(mgrArray)
        // let mgrList = mgrArray.map((item, index) => {
        //     return(
        //             <tr>
        //                 <td>{item.team_id}</td>
        //                 <td>{item.teamName}</td>
        //                 <td>{item.lastName}</td>
        //             </tr>
        //     )
        // })
        // let thirdList = thirdArray.map((item, index) => {
        //     return(
        //         <>
        //             <td>{item.avgTier}</td>
        //             {/* <td>{item.teamName}</td>
        //             <td>{item.lastName}</td> */}
        //         </>
        //     )
        // })
        const list = this.props.store.getAdminTotalTeamSalesReducer.map((item, index) => {
            return(
                            <tr key={index}>
                                <td>{item.team_id}</td>
                                <td>{item.teamName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.avgTier}</td>
                                <td>{item.productsSold}</td>
                                <td>{}</td>
                                <td>{}</td>
                                <td>{item.productsSoldPerTeam}</td>
                                <td>{item.salesPerTeam}</td>
                                <td>{item.totalTeamCommissions}</td>
                            </tr>
                    )
        })

        return (
            <div>
                
                <h2>{this.state.heading}</h2>
                <h1>${JSON.stringify(this.props.store.getAdminTotalTeamSalesReducer)}</h1>
                {/* <h3>${JSON.stringify(this.props.store.getAdminTotalTeamSalesReducer.teamSalesTotal)}</h3>
                <h3>${JSON.stringify(this.props.store.getAdminTotalTeamSalesReducer.teamIDIndividualProductsSold)}</h3> */}
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
                    <tbody>
                            {list}
                            {/* {mgrList}
                            {thirdList} */}
                        
                    </tbody>
                        
                </table>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AdminAllSalesPage);
