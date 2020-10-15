import { SELECTING_APPLICATION_LANGUAGE } from '../../action_types/index'; 

const initialState = {
    selectedLanguage: 'ukr',
}

export const aboutUserReducer = (state = initialState, action) => {
switch(action.type) {
    case SELECTING_APPLICATION_LANGUAGE: 
        return {
            ...state,
            selectedLanguage: action.payload
        }
    default:
        return state
}
}