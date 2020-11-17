import { FETCHING_KNOWLEDGE_TEST, TEST_RESULT, KNOWLEDGE_TESTS_LOADING, 
         NEXT_VOCABULARY_TEST_TASK, ADD_ANSWER_VOCABULARY_TEST,
         KNOWLEDGE_TESTS_LOADED, CLEAR_KNOWLEDGE_TESTS_DATA } from '../../action_types/index'; 
         
const initialState = {
    wordCounter: 0,
    vocabularyTestWords: [''], //! if this array is empty application throw error
    answers: [],
    testResult: {},
    isLastTask: false,
    loading: false,
    loaded: false
}

export const educationPlansReducer = (state = initialState, action) => {
    switch(action.type) {
        case CLEAR_KNOWLEDGE_TESTS_DATA:
            return {
                wordCounter: 0,
                vocabularyTestWords: [''],
                answers: [],
                testResult: {},
                isLastTask: false,
                loading: false,
                loaded: false
            }
        case KNOWLEDGE_TESTS_LOADING:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case KNOWLEDGE_TESTS_LOADED:
            return {
                ...state,
                loading: false,
                loaded: true
        }
            
        case TEST_RESULT: 
            return {
                ...state,
                testResult: {...action.serverPayload}
            }

        case FETCHING_KNOWLEDGE_TEST: 
            return {
                ...state,
                vocabularyTestWords: action.payload
            }

        case NEXT_VOCABULARY_TEST_TASK:
            return {
                ...state,
                wordCounter: !state.isLastTask ? state.wordCounter + 1 : state.wordCounter,
                isLastTask: state.wordCounter === (state.vocabularyTestWords.length - 1)
            }

        case ADD_ANSWER_VOCABULARY_TEST:
            return {
                ...state,
                answers: !state.isLastTask ? [...state.answers, {word: state.vocabularyTestWords[state.wordCounter], answer: action.answer}]
                                               : state.answers
            }   

        default:
            return state
    }
}
