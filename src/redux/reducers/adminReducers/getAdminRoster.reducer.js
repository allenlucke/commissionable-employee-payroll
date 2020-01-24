const getAdminAllSalesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN_ROSTER':
            return action.payload;
        default:
            return state;
    }
} 
export default getAdminAllSalesReducer;