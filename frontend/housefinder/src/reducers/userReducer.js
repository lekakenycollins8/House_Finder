const initialState = {
    id: null,
    role: null,
    // other user fields if needed
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                id: action.payload.id,
                role: action.payload.role,
                // other user fields if needed
            };
        default:
            return state;
    }
};

export default userReducer;
