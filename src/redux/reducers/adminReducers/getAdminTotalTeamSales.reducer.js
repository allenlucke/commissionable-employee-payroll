const getAdminTotalTeamSalesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN_TOTAL_TEAM_SALES':
            return action.payload;
        default:
            return state;
    }
} 
export default getAdminTotalTeamSalesReducer;