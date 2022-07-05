import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../class/API';

// ------------- initialState
const initialState = {
    activeSideBar: window.innerWidth > 849,
    activeNotifications: false,
    loadingUser: false,
    user: {},
    loadingNotifications: false,
    notifications: [],
    loadingUserOrders: false,
    userOrders: {discount: 0, net_total: 0, total: 0, orders: {foods: [], extras: []}},
    expiredSession: false,
    loadingMakeOrders: false,

    // Esto es para saber cuándo limpiar el bloqueo de pantalla en 'body' -> overflow: hidden;... (Se limpiará sólo cuando esta variable sea falsa)
    isFullScreenShadowActive: false,

    makeOrdersModal: {
        active: false,
        nextStep: null,
        title: '',
        description: '',
    },
    makeOrders: {
        total: 0,
        discount: 0,
        net_total: 0,
        orders: {
            foods: [],
            extras: []
        }
    }
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

export const makeOrders = createAsyncThunk(
    'orders/make',
    async (params, {dispatch}) => API('GET', '/orders/make', null, dispatch)
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
            state.makeOrdersModal = {...initialState.makeOrdersModal, active: true}
            state.makeOrders = {...initialState.makeOrders};
        },
        closeMakeOrdersModal: state => {
            state.makeOrdersModal = {...state.makeOrdersModal, active: false};
        },
        goLogin: state => {state.expiredSession = true},
        login: () => initialState,
        copySuccess: state => {
            state.makeOrdersModal = {
                ...state.makeOrdersModal,
                nextStep: 'success',
                title: 'Órdenes copiadas!',
                description: 'El menú ha sido cerrado',
            }
        },
        markReadAllNotifications: state => {
            state.notifications = state.notifications.map(notification => ({...notification, has_been_read: 1}));
        },
        setFullScreenShadowActive: (state, action) => { state.isFullScreenShadowActive = action.payload; },
        closeSideBar: state => { state.activeSideBar = false; }
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

        // makeOrders
        [makeOrders.pending]: state => { state.loadingMakeOrders = true; },
        [makeOrders.fulfilled]: (state, action) => {
            state.loadingMakeOrders = false;
            state.makeOrders = action.payload.data;
        },
        [makeOrders.rejected]: state => {
            state.loadingMakeOrders = false;
            state.makeOrders = initialState.makeOrders;
        },
    }
});



export const { 
    toggleSideBar,
    openNotifications,
    closeNotifications,
    openMakeOrdersModal,
    closeMakeOrdersModal,
    goLogin,
    login,
    copySuccess,
    markReadAllNotifications,
    setFullScreenShadowActive,
    closeSideBar
} = layoutSlice.actions;

export default layoutSlice.reducer;