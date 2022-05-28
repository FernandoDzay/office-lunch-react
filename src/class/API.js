import { goLogin } from '../store/slices/layoutSlice';


const API = (method, request = '', params = {}, dispatch) => {

    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'fakeToken';
    const enviroment = process.env.NODE_ENV;

    const response = {
        requestStatus: 500,
        data: null,
        params,
        message: '',
        authError: null,
        validationErrors: null,
        internalErrorMessage: null,
    }

    const availableMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
    if( !availableMethods.includes(method) ) {
        if(enviroment === 'development') console.log("Ingresa un método válido");
        throw new Error('Ingresa un método válido');
    }


    const handleBeforeData = (r) => {
        if(r.status === 500) return Promise.reject(response);
        response.requestStatus = r.status;
        return r.json();
    }

    const handleData = (data) => {
        const {requestStatus} = response;
        response.data = data;
        if(data.message) response.message = data.message;

        if(requestStatus === 401) {
            if(enviroment === 'development') console.log(`Error de Auth: ${data.authError}`);
            response.authError = data.authError;

            if(data.authError === 2) {
                response.message = 'Tu sessión ha expirado';
                if(dispatch !== undefined) dispatch(goLogin());
            }

            return Promise.reject(response);
        }

        if(data.validation) {
            if(enviroment === 'development') {
                console.log('Error de validación:');
                console.log(data.validation);
            }
            response.validationErrors = data.validation;
            return Promise.reject(response);
        }

        if(requestStatus === 200 || requestStatus === 201) return Promise.resolve(response);
        else return Promise.reject(response);
    }

    const handleCatchedError = (e) => {
        if(response.requestStatus === 500) {
            if(enviroment === 'development') {
                console.log('Error de servidor:');
                console.log(e);
            }
            return Promise.reject(response);
        }

        if(enviroment === 'development' && !e.requestStatus) {
            console.log('No se está obteniendo ningún parámetro conocido');
            console.log(e);
        }
        return Promise.reject(response);
    }

    const getQueryParams = () => {
        if(params === null || Object.keys(params).length === 0) return '';
        return '?' + new URLSearchParams(params).toString();
    }

    const fetchOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`
        },
    }
    if(params !== null) fetchOptions.body = JSON.stringify(params);

    return method === 'GET' ?

    fetch(`${api_url}${request}${getQueryParams()}`, { headers: { Authorization: `bearer ${token}` } })
    .then(r => handleBeforeData(r))
    .then(data => handleData(data))
    .catch(e => handleCatchedError(e))

    :

    fetch(`${api_url}${request}`, fetchOptions)
    .then(r => handleBeforeData(r))
    .then(data => handleData(data))
    .catch(e => handleCatchedError(e));
}

export default API;