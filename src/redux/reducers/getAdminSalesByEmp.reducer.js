const getAdminSalesByEmpReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN_SALES_BY_EMPLOYEE':
            return action.payload;
        default:
            return state;
    }
} 
export default getAdminSalesByEmpReducer;