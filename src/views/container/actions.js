const api_url = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');

export const getMenu = () => dispatch => {
    dispatch({type: 'GET_MENU_PENDING'});
    fetch(`${api_url}/menu/get`, {headers: {Authorization: `bearer ${token}`}})
    .then(r => r.json())
    .then(data => dispatch({type: 'GET_MENU_SUCCESS', payload: data}))
    .catch(error => dispatch({type: 'GET_MENU_FAILED', payload: error}));
}

export const getFoods = () => dispatch => {
    dispatch({type: 'GET_FOODS_PENDING'});
    fetch(`${api_url}/foods`, {headers: {Authorization: `bearer ${token}`}})
    .then(r => r.json())
    .then(data => dispatch({type: 'GET_FOODS_SUCCESS', payload: data}))
    .catch(error => dispatch({type: 'GET_FOODS_FAILED', payload: error}));
}

export const getExtras = () => dispatch => {
    dispatch({type: 'GET_EXTRAS_PENDING'});
    fetch(`${api_url}/extras`, {headers: {Authorization: `bearer ${token}`}})
    .then(r => r.json())
    .then(data => dispatch({type: 'GET_EXTRAS_SUCCESS', payload: data}))
    .catch(error => dispatch({type: 'GET_EXTRAS_FAILED', payload: error}));
}