import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './slices/layoutSlice';
import menuReducer from './slices/menuSlice';
import foodsReducer from './slices/foodsSlice';
import extrasReducer from './slices/extrasSlice';


const store = configureStore({
    reducer: {
        layout: layoutReducer,
        menu: menuReducer,
        foods: foodsReducer,
        extras: extrasReducer,
    }
})

export default store;