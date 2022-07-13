const initialState = {
    robots: []
}

export function robotReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ROBOTS':
            return { ...state, robots: action.robots }
        default:
            return state
    }
}