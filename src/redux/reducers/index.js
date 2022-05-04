import {layoutReducers} from './layoutReducers';
import { viewReducers } from '../../views/container/reducers';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    layoutReducers,
    viewReducers
})

export default rootReducer;