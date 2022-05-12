import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../class/API';


const initialState = {
    loadingExtras: false,
    extras: [],
}

// ----------- thunks
export const getExtras = createAsyncThunk(
    'extras/get',
    async (param, {dispatch}) => API('GET', '/extras', null, dispatch)
)

// ----------- slice
const extrasSlice = createSlice({
    name: 'extras',
    initialState,
    reducers: {},
    extraReducers: {
        [getExtras.pending]: state => { state.loadingExtras = true },
        [getExtras.fulfilled]: (state, action) => {
            state.extras = action.payload.data;
            state.loadingExtras = false;
        },
        [getExtras.rejected]: state => { state.loadingExtras = false },
    }
})


export default extrasSlice.reducer;