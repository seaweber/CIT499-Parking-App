const initialState = {

    signedIn: false,

    currentUser: null,

    change: false
};

const rootReducer = ( state = initialState, action ) => {

    if ( action.type === 'TOGGLE_SIGNED_IN') {

        return {
            ...state,
            signedIn: action.value
        }
    }

    if ( action.type === 'SET_CURRENT_USER') {

        return {
            ...state,
            currentUser: action.currentUser
        }
    }

    if ( action.type === 'TRIGGER_CHANGE') {

        return {
            ...state,
            change: !state.change
        }
    }

    return state;
};

export default rootReducer;
