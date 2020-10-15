import { LOGIN, SIGN_IN, LOG_OUT } from '../../action_types/index'; 

const initialState = {
    isAuthorization: true,
}

export const authorizationReducer = (state = initialState, action) => {
switch(action.type) {
    case LOGIN: 
        return {
            ...state,
            isAuthorization: true
        }
    case SIGN_IN: 
        return {
            ...state,
            isAuthorization: true
        }
    case LOG_OUT: 
        return {
            ...state,
            isAuthorization: false
        }

    default:
    return state
}
}