const getManagerSalesByEmpReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MANAGER_SALES_BY_EMPLOYEE':
            return action.payload;
        default:
            return state;
    }
} 
export default getManagerSalesByEmpReducer;