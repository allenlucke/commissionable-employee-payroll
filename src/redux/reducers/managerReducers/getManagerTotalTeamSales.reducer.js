const getManagerTotalTeamSalesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MANAGER_TOTAL_TEAM_SALES':
            return action.payload;
        default:
            return state;
    }
} 
export default getManagerTotalTeamSalesReducer;