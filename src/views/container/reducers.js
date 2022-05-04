const initialState = {
    loadingMenu: false,
    loadingFoods: false,
    loadingExtras: false,

    menu: [],
    menuStatus: 0,
    
    foods: [],
    extras: [],

    goLogin: false
};


export const viewReducers = (state = initialState, action = {}) => {
    switch(action.type) {
        case 'GET_MENU_PENDING':
            return {...state, loadingMenu: true};
        case 'GET_MENU_SUCCESS':
            if(action.payload.authError) return {...state, goLogin: true};
            if(![0, 1, 2].includes(action.payload.status)) return {...state, loadingMenu: false};
            return {...state, loadingMenu: false, menu: action.payload.menu, menuStatus: action.payload.status};
        case 'GET_MENU_FAILED':
            return {...state, loadingMenu: false};

        case 'GET_FOODS_PENDING':
            return {...state, loadingFoods: true};
        case 'GET_FOODS_SUCCESS':
            if(action.payload.error) return {...state, loadingFoods: false};
            return {...state, loadingFoods: false, foods: action.payload};
        case 'GET_FOODS_FAILED':
            return {...state, loadingFoods: false};

        case 'GET_EXTRAS_PENDING':
            return {...state, loadingExtras: true};
        case 'GET_EXTRAS_SUCCESS':
            if(action.payload.error) return {...state, loadingExtras: false};
            return {...state, loadingExtras: false, extras: action.payload};
        case 'GET_EXTRAS_FAILED':
            return {...state, loadingExtras: false};

        default: 
            return state;
    }
}