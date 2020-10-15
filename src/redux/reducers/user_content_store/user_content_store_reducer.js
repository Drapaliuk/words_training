import { ADD_WORD_TO_VOCABULARY, DELETE_WORD_FROM_VOCABULARY, FETCHING_USER_WORD_SETS,
         UNSELECTING_WORD_FROM_USER_VOCABULARY, CREATE_WORD_SET,
         FETCHING_USER_VOCABULARY, SELECTING_WORD_FROM_USER_VOCABULARY } from '../../action_types/index';

const initialState = {
    vocabulary: [],
    userWordSets: [],
    personalWords: [],
    selectedWords: []
    // phrases: [],
    // podcasts: [],
    // video: [],
}


export const userContentStoreReducer = function(state = initialState, action) {
    switch(action.type) {
        case SELECTING_WORD_FROM_USER_VOCABULARY:
            return {
                ...state,
                selectedWords: [...state.selectedWords, action.payload]
            }

        case UNSELECTING_WORD_FROM_USER_VOCABULARY: 
            return {
                ...state,
                selectedWords: state.selectedWords.filter(el => el._id !== action.payload)
            }

        case FETCHING_USER_VOCABULARY:
            return {
                ...state,
                vocabulary: action.serverPayload
            }

        case ADD_WORD_TO_VOCABULARY:
            return {
                ...state,
                vocabulary: [...state.vocabulary, action.payload]
            }
            
        case DELETE_WORD_FROM_VOCABULARY:
            return {
                ...state,
                vocabulary: [...state.vocabulary.filter(el => el !== action.payload)]
            }
        
        case CREATE_WORD_SET:
            return {
                ...state,
                userWordSets: [...state.userWordSets, {...action.serverPayload}]
            }
        
        case FETCHING_USER_WORD_SETS: 
            return {
                ...state,
                userWordSets: [...state.userWordSets, ...action.serverPayload]
                
            }

        default: 
            return state
    }
}

