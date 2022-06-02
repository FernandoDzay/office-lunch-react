import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../class/API';

// ------------- initialState
const initialState = {
    activeSideBar: true,
    activeNotifications: false,
    activeMakeOrdersModal: {
        active: false,
        nextStep: null,
        title: '',
        description: '',

    },
    loadingUser: false,
    user: {},
    loadingNotifications: false,
    notifications: [],
    loadingUserOrders: false,
    userOrders: {discount: 0, net_total: 0, total: 0, orders: {foods: [], extras: []}},
    expiredSession: false,
};


// ------------- thunks
export const getNotifications = createAsyncThunk(
    'notifications/get',
    async (param, {dispatch}) => API('GET', '/notifications/get', null, dispatch)
)

export const getLoggedUser = createAsyncThunk(
    'users/logged',
    async (param, {dispatch}) => API('GET', '/users/logged', null, dispatch)
)

export const getUserOrders = createAsyncThunk(
    'orders/get-todays-orders/:user_id',
    async (user_id, {dispatch}) => 
        API('GET', `/orders/get-todays-orders/${user_id}`, null, dispatch)
        .catch(error => error.requestStatus === 404 ? Promise.resolve({data: initialState.userOrders}) : Promise.reject(error))
)


// ------------- slice
const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toggleSideBar: state => {state.activeSideBar = !state.activeSideBar},
        openNotifications: state => {state.activeNotifications = true},
        closeNotifications: state => {state.activeNotifications = false},
        openMakeOrdersModal: state => {
            state.activeMakeOrdersModal = {...state.activeMakeOrdersModal, active: true}
        },
        closeMakeOrdersModal: state => {
            state.activeMakeOrdersModal = {...state.activeMakeOrdersModal, active: false}
        },
        goLogin: state => {state.expiredSession = true},
    },
    extraReducers: {
        // Notifications
        [getNotifications.pending]: state => {state.loadingNotifications = true},
        [getNotifications.fulfilled]: (state, action) => {
            state.notifications = action.payload.data;
            state.loadingNotifications = false;
        },
        [getNotifications.rejected]: state => {state.loadingNotifications = false},

        // User
        [getLoggedUser.pending]: state => { state.loadingUser = true; },
        [getLoggedUser.fulfilled]: (state, action) => {
            const image = action.payload.data.image && `${process.env.REACT_APP_API_URL}/images/users/${action.payload.data.image}`;
            state.user = {...action.payload.data, image};
            state.loadingUser = false;
        },
        [getLoggedUser.rejected]: state => { state.loadingUser = false; },

        // User orders
        [getUserOrders.pending]: state => { state.loadingUserOrders = true; },
        [getUserOrders.fulfilled]: (state, action) => {
            state.userOrders = action.payload.data;
            state.loadingUserOrders = false;
        },
        [getUserOrders.rejected]: state => { state.loadingUserOrders = false; },
    }
});



export const { 
    toggleSideBar, 
    openNotifications,
    closeNotifications,
    openMakeOrdersModal,
    closeMakeOrdersModal,
    goLogin,
} = layoutSlice.actions;

export default layoutSlice.reducer;