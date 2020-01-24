const getSalespersonViewSalesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SALESPERSON_ALL_SALES':
            return action.payload;
        default:
            return state;
    }
} 
export default getSalespersonViewSalesReducer;