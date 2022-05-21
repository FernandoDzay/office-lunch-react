import API from "../../class/API";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    loadingTodaysOrders: false,
    loadingWeekOrders: false,
    todaysOrders: {
        total: 0,
        discount: 0,
        net_total: 0,
        orders: []
    },
    weekOrders: {
        total: 0,
        discount: 0,
        net_total: 0,
        weekTotals: {
            monday: {total: 0, discount: 0, net_total: 0},
            tuesday: {total: 0, discount: 0, net_total: 0},
            wednesday: {total: 0, discount: 0, net_total: 0},
            thursday: {total: 0, discount: 0, net_total: 0},
            friday: {total: 0, discount: 0, net_total: 0},
            saturday: {total: 0, discount: 0, net_total: 0},
            sunday: {total: 0, discount: 0, net_total: 0}
        },
        orders: []
    }
}


// --------------- Thunks
export const getTodaysOrders = createAsyncThunk(
    'orders/get-todays-orders',
    async (params = null, {dispatch}) => API('GET', '/orders/get-todays-orders', params, dispatch)
)

export const getWeekOrders = createAsyncThunk(
    'orders/get',
    async (params = null, {dispatch}) => API('GET', '/orders/get', params, dispatch)
)


// --------------- Slice
const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: {
        // getTodaysOrders
        [getTodaysOrders.pending]: state => { state.loadingTodaysOrders = true; },
        [getTodaysOrders.fulfilled]: (state, action) => {
            state.loadingTodaysOrders = false;
            state.todaysOrders = action.payload.data;
        },
        [getTodaysOrders.rejected]: state => {
            state.loadingTodaysOrders = false;
            state.todaysOrders = initialState.todaysOrders;
        },

        // getWeekOrders
        [getWeekOrders.pending]: state => { state.loadingWeekOrders = true; },
        [getWeekOrders.fulfilled]: (state, action) => {
            state.loadingWeekOrders = false;
            state.weekOrders = action.payload.data;
        },
        [getWeekOrders.rejected]: state => {
            state.loadingWeekOrders = false;
            state.weekOrders = initialState.weekOrders;
        },
    }
})

export default ordersSlice.reducer;