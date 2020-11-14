import { act } from 'react-dom/test-utils';
import { LOGIN, SIGN_IN, LOG_OUT, IS_AUTHORIZATION } from '../../action_types/index'; 

const initialState = {
    isAuthorization: false,
    userId: '',
}

export const authorizationReducer = (state = initialState, action) => {
switch(action.type) {
    case IS_AUTHORIZATION:
        return {
            ...state,
            isAuthorization: action.serverPayload.isAuthorization,
            userId: action.serverPayload.userId
        }

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