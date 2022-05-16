import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './slices/layoutSlice';
import menuReducer from './slices/menuSlice';
import foodsReducer from './slices/foodsSlice';
import extrasReducer from './slices/extrasSlice';
import ordersReducer from './slices/ordersSlice';


const store = configureStore({
    reducer: {
        layout: layoutReducer,
        menu: menuReducer,
        foods: foodsReducer,
        extras: extrasReducer,
        orders: ordersReducer,
    }
})

export default store;