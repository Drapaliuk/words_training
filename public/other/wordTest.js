import { getRandomElement, mixingElement } from '../../../components/common/mixers/mixers';


const SELECTING_VARIANT = 'SELECTING VARIANT';
const NEXT_TASKS = 'NEXT WORDS';
const SKIP_WORD_TRAINING_BY_WORD = 'SKIP WORD TRAINING BY WORD';
const CREATE_VARIANT_LIST = 'MIXING WORDS';
const FIFTY_FIFTY = 'FIFTY FIFTY';
const INITIALISATION_WORDS = 'INITIALISATION WORDS';
const SELECTING_WORDS_SET_TRAIN_BY_WORD = 'SELECTING WORDS SET TRAIN BY WORD';


let initialState = {
    testName: 'trainByWord', 
    initialised: false,
    initialWords: [
        // {eng: 'fork', ua: 'вилка'},
        // {eng: 'shelf', ua: 'полиця'},
        // {eng: 'tabble', ua: 'стіл'},
        // {eng: 'road', ua: 'дорога'},
    ],
    word: '',
    mistakesOfTest: [],
    currentWordMistakes: {
        word: null,
        wasSkipped: false,
        targetMistake: [],
        amountMistakes: 0,
        useHint: false
    },
    
    needHint: false,
    isLastTask: false,
    isInitialised: false,
    trueWordCounter: 0,
    userChoice: '',
    isTrueAnswer: false,
    isMistakeAnswer: false,
    isMixedWords: false,
    wordsSet: [],
    selectedSet: '',
    

}





const traininngByWordReducer = function(state = initialState, action) {
    if(action.type === INITIALISATION_WORDS) {
        return {
            ...state,
            initialWords: action.initialWords,
            isInitialised: true
        }
    }

    if(state.isInitialised) {
        return state
    }

    switch (action.type) {
        case SELECTING_WORDS_SET_TRAIN_BY_WORD:
            return {
                ...state,
                selectedSet: action.selectedSet
            }
        // case INITIALISATION_WORDS:
        //     return {
        //         ...state,
        //         initialWords: action.initialWords,
        //     }
        case FIFTY_FIFTY:
            return {
                ...state,
                needHint: true
            }

        case CREATE_VARIANT_LIST:
            const getRandomWords = getRandomElement(state.initialWords, 3, state.trueWordCounter)
            const addedCurrentWord = [...getRandomWords, state.initialWords[state.trueWordCounter]]
            const mixedWords = mixingElement(addedCurrentWord)
            
            return {
                ...state,
                isMixedWords: true,
                wordsSet: [...mixedWords],
            }

        case SELECTING_VARIANT:
            return {
                ...state,
                isMistakeAnswer: !state.initialWords[state.trueWordCounter] === action.userChoicedWord,
                isTrueAnswer: state.initialWords[state.trueWordCounter].eng === action.userChoicedWord,

                currentWordMistakes: {
                                        ...state.currentWordMistakes,
                                        word: state.initialWords[state.trueWordCounter],
                                        amountMistakes: state.initialWords[state.trueWordCounter].eng !== action.userChoicedWord 
                                                        ? state.currentWordMistakes.amountMistakes + 1
                                                        : state.currentWordMistakes.amountMistakes,
                                        targetMistake: state.initialWords[state.trueWordCounter].eng !== action.userChoicedWord 
                                                       ? [...state.currentWordMistakes.targetMistake, action.userChoicedWord]
                                                       : [...state.currentWordMistakes.targetMistake]
                                        
                                      },
            }
        
        case NEXT_TASKS:
            if(state.isLastTask) {
                return {
                    ...state,
                    mistakesOfTest: [
                                        ...state.mistakesOfTest, 
                                        {   
                                            ...state.currentWordMistakes, 
                                            word: state.initialWords[state.trueWordCounter], 
                                            wasSkipped: true
                                        }
                                    ],
                    trueWordCounter: state.trueWordCounter
              
                }
            } 
            return {
                ...state,
                trueWordCounter: state.trueWordCounter + 1,
                isMistakeAnswer: false,
                isTrueAnswer: false,
                mistakesOfTest: [...state.mistakesOfTest, state.currentWordMistakes],
                currentWordMistakes: {
                    word: null,
                    wasSkipped: false,
                    targetMistake: [],
                    amountMistakes: 0,
                    useHint: false
                },
                isMixedWords: false,
                wordsSet: [],
                needHint: false,
                isLastTask: state.trueWordCounter === (state.initialWords.length - 2)
            }



        case SKIP_WORD_TRAINING_BY_WORD: //! прівняти логіку з логікою інших skip word
                if(state.isLastTask) {
                    return {
                        ...state,
                        mistakesOfTest: [
                                            ...state.mistakesOfTest, 
                                            {   
                                                ...state.currentWordMistakes, 
                                                word: state.initialWords[state.trueWordCounter], 
                                                wasSkipped: true
                                            }
                                        ],
                        trueWordCounter: state.trueWordCounter
                  
                    }
                    
                }

                return {
                    ...state,
                    trueWordCounter: state.isLastTask ? state.trueWordCounter : state.trueWordCounter + 1,
                    isTrueAnswer: false,
                    isMistakeAnswer: false,
                    mistakesOfTest: [...state.mistakesOfTest, {...state.currentWordMistakes, word: state.initialWords[state.trueWordCounter], wasSkipped: true}],
                    isMixedWords: false,
                    wordsSet: [],
                    needHint: false,
                    isLastTask: state.trueWordCounter === (state.initialWords.length - 2)

                }


        default: 
            return state
    }
    
}

export const initialisationHandler = (currentWordsSet, selectedWords) => {
    return (dispatch) => {
        dispatch({type: 'INITIALISATION WORDS', currentWordsSet, selectedWords})
    }
    
}

export default traininngByWordReducer;