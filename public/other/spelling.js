// import { mixingElement } from '../../components/common/mixers/mixers';
// import wordsSets from '../../DAL/loadWordsSet';

// const ADD_LETTER = 'ADD LETTER';
// const DELETE_LETTER = 'DELETE LETTER';
// const NEXT_TASK = 'NEXT WORD';
// const INITIAL_SERVIC_WORD = 'INITIAL SERVIC WORD';
// const SKIP_WORD = 'SKIP WORD';
// const HINT = 'HINT';
// const MIXING = 'MIXING';
// const INITIALISATION_WORDS = 'INITIALISATION WORDS';
// const SELECTING_WORDS_SET = 'SELECTING WORDS SET';


// let initialState = {
//     testName: 'trainWords',
//     initialised: false,
//     initialWords: [
//         {eng: 'tabble', ua: 'стіл'},
//         {eng: 'road', ua: 'дорога'},
//         {eng: 'house', ua: 'дім'},
//     ],
//     word: '',
//     letterCounter: 0,
//     currentWord: 0,
//     serviceWord: '',
//     pressedKey: '',
//     mistakesOfTest: [],
//     mistakeSignal: false,
//     mistakeService: {
//         targetLetter: [],
//         skiped: false,
//         amountMistakes: 0,
//         word: null,
        
//     },
//     hintLetter: null,
//     needHint: false,
//     isFinishedTest: false,
//     isMixedWord: '',
//     selectedSet: '',
//     currentWordsSet: '',
//     currentWordsSetInfo: ''


    
 


// }

// const trainingWordsReducer = function(state = initialState, action) {
//     switch(action.type) {
//         case 'IWT': 
//             return {
//                 ...state,
//                 initialWords: action.initialWords
//             }


//         case SELECTING_WORDS_SET:

//             const currentWordsSet = wordsSets[action.selectedSet].filter(el => { //! страшні костилі, виправити, is filter immut method of arr?
//                 return el.eng
//             })

//             return {
//                 ...state,
//                 selectedSet: action.selectedSet,
//                 currentWordsSet: currentWordsSet,
//                 currentWordsSetInfo: wordsSets[action.selectedSet][0],
//                 // initialWords: currentWordsSet
                
//             }


//         case INITIALISATION_WORDS:
//             return {
//                 ...state,
//                 initialWords: action.initialWords
//                 // initialWords: action.initialWords //!

//             }
        
//         case MIXING:
//             return {
//                 ...state,
//                 isMixed: true,
//                 mixedWord: []
//             }
//         case HINT:
//         return {
//             ...state,
//             hintLetter: state.initialWords[state.currentWord].eng[state.letterCounter],
//             needHint: true
//         }

//         case SKIP_WORD:
//             return {
//                 ...state,
//                 mistakeService: {
//                     ...state.mistakeService,
//                     word: state.initialWords[state.currentWord],
//                     skiped: true,
//                     // hintLetter: state.initialWords[state.currentWord + 1].eng[0],
//                     needHint: false,
            
//                 }
//             }

//         case INITIAL_SERVIC_WORD:
//             const mixedWord = mixingElement([...state.initialWords[state.currentWord].eng])
//             return {
//                 ...state,
//                 initialised: true,
//                 serviceWord: [...mixedWord],
//                 hintLetter: state.initialWords[state.currentWord].eng[0]
                
//             }

//         case ADD_LETTER:
//             const wordCopy = [...state.serviceWord].slice()
//             let position = state.serviceWord.indexOf(action.pressedKey)

//             if(action.pressedKey === state.initialWords[state.currentWord].eng[state.letterCounter]){
//                 wordCopy.splice(position, 1)
//             } else {
//                 return {
//                     ...state,
//                     mistakeSignal: true,
//                     mistakeService: {
//                                         ...state.mistakeService,
//                                         amountMistakes: state.mistakeService.amountMistakes + 1,
//                                         targetLetter: [
//                                             ...state.mistakeService.targetLetter,
//                                             action.pressedKey
//                                         ]
//                                     },
//                     hintLetter: state.initialWords[state.currentWord].eng[state.letterCounter],
                    
//                 }

//             }

//             return {
//                 ...state, 
//                 pressedKey: state.pressedKey + action.pressedKey,
//                 serviceWord: wordCopy.join(''),
//                 letterCounter: state.letterCounter + 1,
//                 mistakeSignal: false,
//                 mistakeService: {
//                     ...state.mistakeService,
//                     word: state.initialWords[state.currentWord],
//                     targetLetter: 
//                                     [
//                                         ...state.mistakeService.targetLetter,
//                                         action.pressedKey
//                                     ]
//                                 },
//                 hintLetter: state.initialWords[state.currentWord].eng[state.letterCounter + 1],
//                 needHint: false
//             }

//         case DELETE_LETTER:
//             const pressedWordCopy = [...state.pressedKey]
//             const deletedLetter = pressedWordCopy.splice((pressedWordCopy.length - 1), 1)

//             return {
//                 ...state,
//                 pressedKey: pressedWordCopy.join(''),
//                 serviceWord: [...state.serviceWord, ...deletedLetter],
//                 letterCounter: state.letterCounter > 0 ? state.letterCounter - 1 : 0, 
//                 hintLetter: state.initialWords[state.currentWord][state.letterCounter]
//             }
        
//         case NEXT_TASK:
//             let mixedCurrentWord;
//             if(state.isFinishedTest){
//                 mixedCurrentWord = mixingElement([...state.initialWords[state.currentWord].eng])
//             } else {
//                mixedCurrentWord = mixingElement([...state.initialWords[state.currentWord + 1].eng])
//             }


//             if(state.isFinishedTest) {
//                 return {
//                     ...state,
//                     currentWord: 0,
//                     serviceWord: '',
//                     pressedKey: '',
//                     letterCounter: 0,
//                     mistakesOfTest: [
//                         ...state.mistakesOfTest,
//                         // state.mistakeService  //its permanent version
//                         {...state.mistakeService, word: state.initialWords[state.currentWord]} //its temporary version
//                     ],
//                     mistakeService: {
//                         targetLetter: [],
//                         skiped: false,
//                         amountMistakes: 0,
//                         word: null,
//                     },
//                     hintLetter: '',
//                     needHint: false,
//                     isFinishedTest: true
//                 }
//             }
//             return {
//                 ...state,
//                 currentWord: state.currentWord + 1,
//                 serviceWord: mixedCurrentWord,
//                 pressedKey: '',
//                 letterCounter: 0,
//                 mistakesOfTest: [
//                     ...state.mistakesOfTest,
//                     // state.mistakeService  //its permanent version
//                     {...state.mistakeService, word: state.initialWords[state.currentWord]} //its temporary version
//                 ],
//                 mistakeService: {
//                     targetLetter: [],
//                     skiped: false,
//                     amountMistakes: 0,
//                     word: null,
//                 },
//                 hintLetter: state.initialWords[state.currentWord + 1].eng[0],
//                 needHint: false,
//                 isFinishedTest: state.currentWord === (state.initialWords.length - 2),
        

//             }
//         default:             
//             return state
//     }
// }

// export const iwtAC = (initialWords) => {
//     return {
//         type: 'IWT',
//         initialWords
//     }
// }







// export default trainingWordsReducer;




