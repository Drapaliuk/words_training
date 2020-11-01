import { LOGIN, SIGN_IN, LOG_OUT } from '../../action_types/index'; 

const initialState = {
    isAuthorization: true,
    userId: '5f9dd00414204d1940d770e1',
}

export const authorizationReducer = (state = initialState, action) => {
switch(action.type) {
    case LOGIN: 
        return {
            ...state,
            isAuthorization: action.serverPayload.isAuthorization,
            userId: action.serverPayload.userId

        }
    case SIGN_IN: 
        return {
            ...state,
            isAuthorization: action.serverPayload.isAuthorization,
            userId: action.serverPayload.userId
        }
    case LOG_OUT: 
        return {
            ...state,
            isAuthorization: false,
            userId: ''
        }

    default:
    return state
}
}