import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './slices/layoutSlice';


const store = configureStore({
    reducer: {
        layout: layoutReducer
    }
})

export default store;