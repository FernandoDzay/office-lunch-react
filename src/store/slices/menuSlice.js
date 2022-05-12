import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../class/API';


const initialState = {
    loadingMenu: false,
    menu: [],
    menuStatus: 0,
}



// ---------- thunks
export const getMenu = createAsyncThunk(
    'menu/get',
    async (params, {dispatch}) => {
        return API('GET', '/menu/get', null, dispatch)
        .then(response => ![0, 1, 2].includes(response.data.status) ? Promise.reject(response) : response)
        .catch(error => error.data.status === 0 ? Promise.resolve(error) : Promise.reject(error));
    }
)


// ---------- slice
const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: {
        [getMenu.pending]: state => {state.loadingMenu = true},
        [getMenu.fulfilled]: (state, action) => {
            state.menu = action.payload.data.menu;
            state.menuStatus = action.payload.data.status;
            state.loadingMenu = false;
        },
        [getMenu.rejected]: state => {state.loadingMenu = false},
    }
})


export default menuSlice.reducer;