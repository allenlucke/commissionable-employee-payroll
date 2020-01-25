const getManagerHomePageReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MANAGER_HOMEPAGE':
            return action.payload;
        default:
            return state;
    }
} 
export default getManagerHomePageReducer;