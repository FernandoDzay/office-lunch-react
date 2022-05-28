import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../class/API";


const initialState = {
    // Thunks
    loadingPendingPayments: false,
    pendingPayments: [],
    loadingUserPayments: false,
    userPayments: [],
    loadingCreateUserPayment: false,
    loadingUpdateUserPayment: false,
    loadingDeleteUserPayment: false,

    // Actions
    modal: {
        user_id: null,
        active: false,
        nextStep: null,
        nextStepTitle: '',
    }
};


export const getPendingPayments = createAsyncThunk(
    'payments/get',
    async (params = null, {dispatch}) => API('GET', '/payments/get', params, dispatch)
)

export const getUserPayments = createAsyncThunk(
    'payments/get-user-payments',
    async (params, {dispatch}) => {
        return API('GET', `/payments/get-user-payments/${params.id}`, params, dispatch)
        .then(response => Promise.resolve(response))
        .catch(error => error.data.message ? Promise.resolve({...error, data: []}) : Promise.reject(error))
    }
)

export const createUserPayment = createAsyncThunk(
    'payments/create',
    async (params, {dispatch}) => API('POST', '/payments/create', params, dispatch)
)

export const updateUserPayment = createAsyncThunk(
    'payments/update',
    async (params, {dispatch}) => API('PATCH', '/payments/update', params, dispatch)
)

export const deleteUserPayment = createAsyncThunk(
    'payments/delete',
    async (params, {dispatch}) => API('DELETE', `/payments/delete/${params.id}`, params, dispatch)
)


const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        closeModal: state => {
            state.modal = {...initialState.modal};
        },
    },
    extraReducers: {
        // getPendingPayments
        [getPendingPayments.pending]: state => { state.loadingPendingPayments = true; },
        [getPendingPayments.fulfilled]: (state, action) => {
            state.pendingPayments = action.payload.data;
            state.loadingPendingPayments = false;
        },
        [getPendingPayments.rejected]: state => {
            state.pendingPayments = initialState.pendingPayments;
            state.loadingPendingPayments = false;
        },
        
        // getUserPayments
        [getUserPayments.pending]: state => {
            state.loadingUserPayments = true;
            state.modal = {...initialState.modal, active: true};
        },
        [getUserPayments.fulfilled]: (state, action) => {
            state.userPayments = action.payload.data;
            state.loadingUserPayments = false;
            state.modal = {...state.modal, user_id: action.payload.params.id}
        },
        [getUserPayments.rejected]: state => {
            state.userPayments = initialState.userPayments;
            state.loadingUserPayments = false;
        },

        // createUserPayment
        [createUserPayment.pending]: state => { state.loadingCreateUserPayment = true; },
        [createUserPayment.fulfilled]: (state, action) => {
            state.pendingPayments = state.pendingPayments.map(pendingPayment => {
                return pendingPayment.id === action.payload.params.user_id ?
                {...pendingPayment, total_paid: Number(pendingPayment.total_paid) + Number(action.payload.params.quantity)} :
                pendingPayment;
            });

            if(state.modal.active) {
                state.modal = {
                    ...state.modal,
                    nextStep: 'success',
                    nextStepTitle: 'Pago creado exitosamente!',
                }
            }
            state.loadingCreateUserPayment = false;
        },
        [createUserPayment.rejected]: state => {
            state.modal = {
                ...state.modal,
                nextStep: 'fail',
                nextStepTitle: 'No se pudo agregar el pago',
            }
            state.loadingCreateUserPayment = false;
        },

        // updateUserPayment
        [updateUserPayment.pending]: state => { state.loadingUpdateUserPayment = true; },
        [updateUserPayment.fulfilled]: state => { state.loadingUpdateUserPayment = false; },
        [updateUserPayment.rejected]: state => { state.loadingUpdateUserPayment = false; },

        // deleteUserPayment
        [deleteUserPayment.pending]: state => { state.loadingDeleteUserPayment = true; },
        [deleteUserPayment.fulfilled]: (state, action) => {
            state.pendingPayments = state.pendingPayments.map(pendingPayment => {
                return pendingPayment.id === action.payload.params.user_id ?
                {...pendingPayment, total_paid: Number(pendingPayment.total_paid) - Number(action.payload.params.quantity)} :
                pendingPayment;
            });

            state.modal = {
                ...state.modal,
                nextStep: 'success',
                nextStepTitle: 'Pago borrado exitosamente!',
            }
            state.loadingDeleteUserPayment = false;
        },
        [deleteUserPayment.rejected]: state => {
            state.modal = {
                ...state.modal,
                nextStep: 'fail',
                nextStepTitle: 'No se pudo borrar el pago',
            }
            state.loadingDeleteUserPayment = false;
        },
    }
});


export const {
    closeModal,
} = paymentsSlice.actions;
export default paymentsSlice.reducer;