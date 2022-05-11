import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../class/API';

// ------------- initialState
const initialState = {
    activeSideBar: false,
    activeNotifications: false,
    activeMakeOrdersModal: false,
    loadingUser: false,
    user: {},
    loadingNotifications: false,
    notifications: [],
    loadingUserOrders: false,
    userOrders: [],
    expiredSession: false,
};


// ------------- thunks
export const getNotifications = createAsyncThunk(
    'notifications/get',
    async (param, {dispatch}) => API('GET', '/notifications/get', null, dispatch)
)

// export cons


// ------------- slice
const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toggleSideBar: state => {state.activeSideBar = !state.activeSideBar},
        openNotifications: state => {state.activeNotifications = true},
        closeNotifications: state => {state.activeNotifications = false},
        openMakeOrdersModal: state => {state.activeMakeOrdersModal = true},
        closeMakeOrdersModal: state => {state.activeMakeOrdersModal = false},
        goLogin: state => {state.expiredSession = true},
    },
    extraReducers: {
        [getNotifications.pending]: state => {state.loadingNotifications = true},
        [getNotifications.fulfilled]: (state, action) => {
            // console.log(action.payload);
            state.notifications = action.payload.data;
            state.loadingNotifications = false;
        },
        [getNotifications.rejected]: (state, action) => {state.loadingNotifications = false}
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