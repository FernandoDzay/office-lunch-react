import API from "../../class/API"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"



const initialState = {
    loadingGroups: false,
    groups: [],
    loadingUsersGroups: false,
    usersGroups: [],
}


export const getGroups = createAsyncThunk(
    'groups/get',
    async (param, {dispatch}) => API('GET', '/groups/get', null, dispatch)
)

export const getUsersGroups = createAsyncThunk(
    'groups/get-users-groups',
    async (param, {dispatch}) => API('GET', '/groups/get-users-groups', null, dispatch)
)


const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {},
    extraReducers: {
        // Groups
        [getGroups.pending]: state => {state.loadingGroups = true},
        [getGroups.fulfilled]: (state, action) => {
            state.groups = action.payload.data;
            state.loadingGroups = false;
        },
        [getGroups.rejected]: state => {
            state.groups = initialState.groups;
            state.loadingGroups = false;
        },

        // Users Groups
        [getUsersGroups.pending]: state => {state.loadingUsersGroups = true},
        [getUsersGroups.fulfilled]: (state, action) => {
            state.usersGroups = action.payload.data;
            state.loadingUsersGroups = false;
        },
        [getUsersGroups.rejected]: state => {
            state.usersGroups = initialState.usersGroups;
            state.loadingUsersGroups = false;
        },
    },
});


export default groupsSlice.reducer;