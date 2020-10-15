import { CREATE_EDUCATION_PLANS, FETCHING_KNOWLEDGE_TEST,
             NEXT_VOCABULARY_TEST_TASK, ADD_ANSWER_VOCABULARY_TEST } from '../../action_types/index'; 

const initialState = {
    educationPlan: [],
    languageLevel: [{language: 'eng', level: 'A1', dateTest: '', vocabulary: 3000}],
    wordCounter: 0,
    vocabularyTestWords: [''], //! if this array is empty application throw error
    answers: [],
    isLastTask: false
}

export const educationPlansReducer = (state = initialState, action) => {
    switch(action.type) {
        // case CREATE_EDUCATION_PLANS:
            // console.log(CREATE_EDUCATION_PLANS, action.payload)
            // return {
            //     ...state,
            //     educationPlan: action.payload
            // }
        case FETCHING_KNOWLEDGE_TEST: 
            return {
                ...state,
                vocabularyTestWords: action.payload
            }

        case NEXT_VOCABULARY_TEST_TASK:
            const isLastWord = state.wordCounter === (state.vocabularyTestWords.length - 1)
            return {
                ...state,
                wordCounter: !isLastWord ? state.wordCounter + 1 : state.wordCounter,
                isLastTask: isLastWord
                
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
