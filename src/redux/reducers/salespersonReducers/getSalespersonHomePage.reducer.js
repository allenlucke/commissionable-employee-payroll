const getSalespersonHomePageReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SALESPERSON_HOMEPAGE':
            return action.payload;
        default:
            return state;
    }
} 
export default getSalespersonHomePageReducer;