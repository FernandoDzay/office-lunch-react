const initialState = {
    activeSideBar: true,
    activeNotifications: false,
    activeMakeOrdersModal: false,
    loadingUser: false,
    user: {},
    loadingNotifications: false,
    notifications: [],
    loadingUserOrders: false,
    userOrders: [],
};

export const layoutReducers = (state=initialState, action={}) => {
    switch(action.type) {
        case 'TOGGLE_SIDE_BAR':
            return {...state, activeSideBar: !state.activeSideBar};
        case 'OPEN_NOTIFICATIONS':
            return {...state, activeNotifications: true}
        case 'CLOSE_NOTIFICATIONS':
            return {...state, activeNotifications: false}
        case 'OPEN_MAKE_ORDERS_MODAL':
            return {...state, activeMakeOrdersModal: true}
        case 'CLOSE_MAKE_ORDERS_MODAL':
            return {...state, activeMakeOrdersModal: false}

        // Async reducers

        case 'GET_LOGGED_USER_PENDING':
            return ({...state, loadingUser: true});
        case 'GET_LOGGED_USER_SUCCESS':
            return ({...state, user: action.payload, loadingUser: false});
        case 'GET_LOGGED_USER_FAILED':
            return ({...state, user: {}, loadingUser: false});

        case 'GET_NOTIFICATIONS_PENDING':
            return ({...state, loadingUser: true});
        case 'GET_NOTIFICATIONS_SUCCESS':
            return ({...state, notifications: action.payload, loadingUser: false});
        case 'GET_NOTIFICATIONS_FAILED':
            return ({...state, notifications: [], loadingUser: false});

        case 'GET_USER_ORDERS_PENDING':
            return ({...state, loadingUserOrders: true});
        case 'GET_USER_ORDERS_SUCCESS':
            return ({...state, userOrders: action.payload, loadingUserOrders: false});
        case 'GET_USER_ORDERS_FAILED':
            return ({...state, userOrders: [], loadingUserOrders: false});

        default:
            return state;
    }
}