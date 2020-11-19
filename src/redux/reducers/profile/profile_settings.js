import { SELECT_LANGUAGE } from '../../action_types/index';


const initState = {
    selectedLanguages: 'eng' 
}

export const profileReducer = (prevState = initState, action) => {
    switch(action.types) {
        case SELECT_LANGUAGE:
            console.log('ACTION', action)
            return {
                ...prevState,
                selectedLanguage: action.selectedLanguage
            }
        default:
            return prevState
    }
}