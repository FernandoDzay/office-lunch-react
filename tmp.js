// --------------------------- Action
export const setSearchField = (text) => ({
    type: 'CHANGE_SEARCH_FIELD',
    payload: text
});




// --------------------------- Reducer
const initialState = {
    searchField: ''
};

export const searchRobots = (state=initialState, action={}) => {
    switch(action.type) {
        case 'CHANGE_SEARCH_FIELD': 
            // return Object.assign({}, state, {searchField: action.payload});
            return {...state, searchField: action.payload};
        default:
            return state;
    }
};



// --------------------------- En App, provider
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { searchRobots } from './reducers'; // Este import, debería ser 'rootReducer'

const store = createStore(searchRobots);

<Provider>
    <App store={store} />
</Provider>



// --------------------------- En componente, connect
import { setSearchField } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)) 
    }
}

const Component = () => <div></div>;


export default connect(mapStateToProps, mapDispatchToProps)(Component)

// Ahora de esta manera, Component tendrá acceso a this.props.searchField, this.props.onSearchChange