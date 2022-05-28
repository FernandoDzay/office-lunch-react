import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './slices/layoutSlice';
import menuReducer from './slices/menuSlice';
import foodsReducer from './slices/foodsSlice';
import extrasReducer from './slices/extrasSlice';
import ordersReducer from './slices/ordersSlice';
import groupsReducer from './slices/groupsSlice';
import usersReducer from './slices/usersSlice';
import paymentsReducer from './slices/paymentsSlice';


const store = configureStore({
    reducer: {
        layout: layoutReducer,
        menu: menuReducer,
        foods: foodsReducer,
        extras: extrasReducer,
        orders: ordersReducer,
        groups: groupsReducer,
        users: usersReducer,
        payments: paymentsReducer,
    }
})

export default store;