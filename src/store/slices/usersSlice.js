import API from "../../class/API"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"



const initialState = {
    loadingUsers: false,
    users: [],
}


export const getUsers = createAsyncThunk(
    'users/get',
    async (param, {dispatch}) => API('GET', '/users', null, dispatch)
)


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending]: state => {state.loadingUsers = true},
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload.data;
            state.loadingUsers = false;
        },
        [getUsers.rejected]: state => {
            state.users = initialState.users;
            state.loadingUsers = false
        },
    },
});


export default usersSlice.reducer;