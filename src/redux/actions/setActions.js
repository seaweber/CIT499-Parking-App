export const toggleSignedIn = value => {

    return {
        type: 'TOGGLE_SIGNED_IN',
        value: value
    }
};

export const setCurrentUser = user => {

    return {
        type: 'SET_CURRENT_USER',
        user: user
    }
};

export const triggerChange = () => {

    return {
        type: 'TRIGGER_CHANGE',
    }
};
