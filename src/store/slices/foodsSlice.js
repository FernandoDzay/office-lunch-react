import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../class/API';


const initialState = {
    foods: [],
    loadingFoods: false
};


// ----------- thunks
export const getFoods = createAsyncThunk(
    'foods/get',
    async (param, {dispatch}) => API('GET', '/foods', null, dispatch)
)


// ----------- slice
const foodsSlice = createSlice({
    name: 'foods',
    initialState,
    reducers: {},
    extraReducers: {
        [getFoods.pending]: state => { state.loadingFoods = true },
        [getFoods.fulfilled]: (state, action) => {
            state.foods = action.payload.data;
            state.loadingFoods = false;
        },
        [getFoods.rejected]: state => { state.loadingFoods = false },
    }
})


export default foodsSlice.reducer;