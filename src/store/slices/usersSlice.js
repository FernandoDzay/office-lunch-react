import API from "../../class/API";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    loadingUsers: false,
    users: [],
    modal: {
        active: false,
        title: false,
        nextStep: null,
        updateLoading: false,
        user: {
            id: null,
            username: '',
            email: '',
            birth_day: 1,
            birth_month: 1,
            is_admin: 0,
            status: 0,
        },
        errors: {
            username: '',
            email: '',
            is_admin: '',
            status: '',
        }
    }
}


export const getUsers = createAsyncThunk(
    'users/get',
    async (param, {dispatch}) => API('GET', '/users', null, dispatch)
)

export const submitForm = createAsyncThunk(
    'users/update',
    async (params, {dispatch}) => API('PUT', '/users/update', params, dispatch)
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        openModal: (state, action) => {
            const user = state.users.find(user => user.id === action.payload);

            state.modal = {
                ...initialState.modal,
                active: true,
                title: `Usuario: ${user.username}`,
                nextStep: null,
                user
            }
        },
        closeModal: state => {
            state.modal = {...initialState.modal};
        },
        handleInputsChange: (state, action) => {
            state.modal.user = {...state.modal.user, [action.payload.name]: action.payload.value};
        },
        setModalErrors: (state, action) => {
            state.modal = {...state.modal, errors: action.payload};
        }
    },
    extraReducers: {
        [getUsers.pending]: state => {state.loadingUsers = true},
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload.data;
            state.loadingUsers = false;
        },
        [getUsers.rejected]: state => {
            state.users = initialState.users;
            state.loadingUsers = false;
        },

        [submitForm.pending]: state => { state.modal = {...state.modal, errors: initialState.modal.errors, updateLoading: true}; },
        [submitForm.fulfilled]: (state, action) => {
            state.modal = {...state.modal, updateLoading: false, nextStep: 'success', title: 'Usuario actualizado'};
            state.users = state.users.map(user => {
                if(action.payload.params.id === user.id) return action.payload.params;
                return user;
            });
        },
        [submitForm.rejected]: state => {
            state.modal = {...state.modal, updateLoading: false, nextStep: 'fail', title: 'Ocurrió un error'};
        },
    },
});


export const {
    openModal,
    closeModal,
    handleInputsChange,
    setModalErrors,
} = usersSlice.actions;

export default usersSlice.reducer;