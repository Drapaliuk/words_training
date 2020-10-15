import { SELECTING_APPLICATION_LANGUAGE, FETCHING_PERSONAL_DATA } from '../../action_types/index'; 

const initialState = {
    selectedLanguage: 'ukr',
    firstName: '',
    lastName: '',
    age: '',
    birthDay: '',
    national: '',
    sex: '',
    country: '',
    town: '',
    
}

export const personalUserDataReducer = (state = initialState, action) => {
    switch(action.type) {
        case SELECTING_APPLICATION_LANGUAGE: 
            return {
                ...state,
                selectedLanguage: action.payload
            }
        
        case FETCHING_PERSONAL_DATA: 
            return {
                ...state,
                ...action.serverPayload
            }

        default:
            return state
    }
}