const getManagerAllSalesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MANAGER_ALL_SALES':
            return action.payload;
        default:
            return state;
    }
} 
export default getManagerAllSalesReducer;