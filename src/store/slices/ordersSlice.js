import API from "../../class/API";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    loadingTodaysOrders: false,
    todaysOrders: {
        total: 0,
        discount: 0,
        net_total: 0,
        orders: []
    }
}


// --------------- Thunks
export const getTodaysOrders = createAsyncThunk(
    'orders/get-todays-orders',
    async (params = null, {dispatch}) => API('GET', '/orders/get-todays-orders', params, dispatch)
)


// --------------- Slice
const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: {
        [getTodaysOrders.pending]: state => { state.loadingTodaysOrders = true; },
        [getTodaysOrders.fulfilled]: (state, action) => {
            state.loadingTodaysOrders = false;
            state.todaysOrders = action.payload.data;
        },
        [getTodaysOrders.rejected]: state => {
            state.loadingTodaysOrders = false;
            state.todaysOrders = initialState.todaysOrders;
        },
    }
})

export default ordersSlice.reducer;