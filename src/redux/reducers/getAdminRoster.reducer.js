const getAdminAllSalesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ROSTER':
            return action.payload;
        default:
            return state;
    }
} 
export default getAdminAllSalesReducer;