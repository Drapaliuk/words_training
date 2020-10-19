import { act } from 'react-dom/test-utils';
import { SELECTING_APPLICATION_LANGUAGE, FETCHING_PERSONAL_DATA,
         CHANGE_USER_PERSONAL_DATA, SAVE_USER_PERSONAL_DATA,
         CLEAR_USER_PERSONAL_DATA, CANCEL_EDIT_PERSONAL_DATA } from '../../action_types/index'; 

const initialState = {
    t: 1,
    selectedLanguage: 'ukr',
    personalData: {
        firstName: '',
        lastName: '',
        age: '',
        birthDay: '',
        sex: '',
    },

    temporaryPersonalData: {}
    
    
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
                ...action.serverPayload,
                personalData: {...action.serverPayload},
                temporaryPersonalData: {...action.serverPayload},

            }

        case CHANGE_USER_PERSONAL_DATA:
            return {
                ...state,
                temporaryPersonalData: {...state.temporaryPersonalData, ...action.payload},

            }

        case SAVE_USER_PERSONAL_DATA:
            console.log(action)
            return {
                ...state,
                ...action.middlewarePayload,
                personalData: {...action.middlewarePayload},
                temporaryPersonalData: {...action.middlewarePayload}
            }
        case CLEAR_USER_PERSONAL_DATA:
            return {
                selectedLanguage: 'ukr',
                firstName: '',
                lastName: '',
                age: '',
                birthDay: '',
                sex: '',
                personalData: {
                    firstName: '',
                    lastName: '',
                    age: '',
                    birthDay: '',
                    sex: '',
                },
                temporaryPersonalData: {}
            }
        case CANCEL_EDIT_PERSONAL_DATA:
            return {
                ...state,
                temporaryPersonalData: {...state.personalData},
            }

        default:
            return state
    }
}