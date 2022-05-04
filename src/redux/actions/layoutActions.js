export const toggleSideBar = () => ({
    type: 'TOGGLE_SIDE_BAR'
});

export const openNotifications = () => ({
    type: 'OPEN_NOTIFICATIONS'
})

export const closeNotifications = () => ({
    type: 'CLOSE_NOTIFICATIONS'
})

export const openMakeOrdersModal = () => ({
    type: 'OPEN_MAKE_ORDERS_MODAL'
})

export const closeMakeOrdersModal = () => ({
    type: 'CLOSE_MAKE_ORDERS_MODAL'
})






// ------------------------------------ Async actions

const api_url = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');

export const getLoggedUser = () => dispatch => {
    dispatch({type: 'GET_LOGGED_USER_PENDING'});

    fetch(`${api_url}/users/logged`, {
        headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(r => r.json())
    .then(data => {
        if(data.error || !data.id) throw new Error('error!');
        // if(data.authError) return this.setState({sessionExpired: true});

        const image = `${api_url}/images/users/${data.image}`;
        dispatch({type: 'GET_LOGGED_USER_SUCCESS', payload: {...data, image}});
    })
    .catch(error => dispatch({type: 'GET_LOGGED_USER_FAILED', payload: error}));
}

export const getNotifications = () => dispatch => {
    dispatch({type: 'GET_NOTIFICATIONS_PENDING'});
    fetch(`${api_url}/notifications/get`, {headers: {Authorization: `bearer ${token}`}})
    .then(r => r.json())
    .then(data => {
        dispatch({type: 'GET_NOTIFICATIONS_SUCCESS', payload: data.length > 0 ? data : []});
    })
    .catch(error => dispatch({type: 'GET_NOTIFICATIONS_FAILED', payload: error}));
}

export const getUserOrders = user_id => dispatch => {
    // console.log(user_id);
    dispatch({type: 'GET_USER_ORDERS_PENDING'});
    fetch(`${api_url}/orders/get-todays-orders?user_id=${user_id}`, {
        headers: {Authorization: `bearer ${token}`}
    })
    .then(r => r.json())
    .then(data => dispatch({type: 'GET_USER_ORDERS_SUCCESS', payload: data}))
    .catch(error => {console.log(error);
        dispatch({type: 'GET_USER_ORDERS_FAILED', payload: error})});
}