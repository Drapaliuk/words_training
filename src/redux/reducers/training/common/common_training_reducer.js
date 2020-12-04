import { FETCHING_WORDS, SELECTING_WORD, FETCHING_WORD_SETS_NAMES, NEXT_TASK_COMMON, SKIP_TASK_COMMON,
         COLLECTING_COMMON_STATISTICS, SELECTING_FULL_KIT, CREATE_EDUCATION_PLANS, UNSELECTING_WORD,
         CLEAR_SELECTED_WORDS_CURRENT_WORD_SET, FETCHING_KNOWLEDGE_TEST, SELECTING_TRAINING_MODE,
         DELETE_SELECTED_WORD, CLEAR_SELECTED_WORDS, INITIALIZATION_CURRENT_TRAINING_MODE,
         UNSELECTING_FULL_KIT, EXIT_FROM_TRAINING, FETCHING_TASK_CARDS, GET_TASKS, FETCHING_MIXED_TASKS,
         PAUSE_TRAINING, CONTINUE_TRAINING, LOADING_PAUSED_TRAINING, REVIEW_PREVIOUS_TASKS,
         SELECT_LANGUAGE_PAIR } from '../../../action_types/index';

export let commonDataState = {
        allTrainingsIds: [{id: '001', url: '/byword', names: {ukr: "Тренування слів", eng: 'Words training', rus: 'Тренировка слова'}}, //! it must fetch from server, but i should use 'Actuality language'
                          {id: '002', url: '/training', names: {ukr: "Тренування правопису", eng: 'Spelling training', rus: 'Тренировка правописания'}},
                          {id: '003', url: '/mixed', names: {ukr: "Змішаний режим", eng: 'Mixed mode', rus: 'Смешанный режим'}} //renamme to trainingModes
                        ],
        availableLanguagesForTraining: [ // має приходити з сервера
            {code: 'ukr', fullName: 'Українська'},
            {code: 'rus', fullName: 'Руский'},
            {code: 'eng', fullName: 'English'}
        ],
        
        allSetsNames: [],
        currentWordCounter: 0, //currentTaskCounter
        currentTrainingModeId: '', // реалізувати до кінця
        trainingStatistics: [], 
        initialisedWords: [], //!rename
        isLastTask: false,
        isFinishedTraining: false,
        scheduleTaskCard: [], //testPlan //testEducationPlan
        selectedWords: [],
        isLoaded: false, //! what????
        selectedTrainingModeId: null,
        isLoadingPausedTraining: false,
        languagePair: {
                        firstLanguage: {code: 'eng', fullName: 'English'},
                        secondLanguage: {code: 'ukr', fullName: 'Українська'}
                      }



}




export const commonData = function(state, action) {
    switch(action.type) {

        case SELECT_LANGUAGE_PAIR:
            const { languageNumber, languageObject } = action.selectedLanguage;
            return {
                ...state,
                languagePair: {...state.languagePair, [languageNumber]: languageObject}
            }

        case REVIEW_PREVIOUS_TASKS:
            return {
                ...state,
                currentWordCounter: action.taskNumber
            }

        case LOADING_PAUSED_TRAINING:
            return {
                ...state,
                isLoadingPausedTraining: action.isLoadingPausedTraining
            }
        
        case PAUSE_TRAINING: 
            return {
                ...state,
                scheduleTaskCard: [],
                isLoaded: false,
                allSetsNames: [],
                currentWordCounter: 0, 
                currentTrainingModeId: '', 
                trainingStatistics: [], 
                initialisedWords: [],
                isLastTask: false,
                isFinishedTraining: false,
                selectedWords: [],
                selectedTrainingModeId: null,
            }

        case CONTINUE_TRAINING: 
            const {scheduleTaskCards, currentTaskCounter, trainingStatistics, currentTrainingModeId} = action.middlewarePayload;

            console.log(CONTINUE_TRAINING, action.middlewarePayload)
            return {
                ...state,
                scheduleTaskCard: scheduleTaskCards,
                trainingStatistics,
                currentWordCounter: currentTaskCounter,
                isLoaded: true,
                currentTrainingModeId
            }

        case FETCHING_MIXED_TASKS:
            return {
                ...state,
                scheduleTaskCard: [...action.serverPayload.scheduleTaskCard],
                isLoaded: true
            }
        case GET_TASKS:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО
            return {
                ...state,
                scheduleTaskCard: [...action.serverPayload.scheduleTaskCard],
                isLoaded: true
            }

        case FETCHING_TASK_CARDS:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО
            return {
                ...state,
                scheduleTaskCard: [...action.serverPayload.scheduleTaskCard],
                isLoaded: true
            }
        
        case SELECTING_TRAINING_MODE:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО 
            return {
                ...state,
                selectedTrainingModeId: action.payload
            }

        case EXIT_FROM_TRAINING:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО
            return {
                ...state,
                currentWordCounter: 0, 
                currentTrainingModeId: '',
                trainingStatistics: [], 
                isLastTask: false,
                isFinishedTraining: false,
                scheduleTaskCard: [], 
                selectedWords: [],
                isLoaded: false,
                selectedTrainingModeId: null,
            } 
        

        case CLEAR_SELECTED_WORDS_CURRENT_WORD_SET:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО //!-?
            return {
                ...state, 
                selectedWords: action.middlewarePayload,

            }

        case INITIALIZATION_CURRENT_TRAINING_MODE:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО
            return {
                ...state,
                currentTrainingModeId: action.trainingId
            }
        case DELETE_SELECTED_WORD:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО  
            return {
                ...state,
                selectedWords: state.selectedWords.filter(el => el._id !== action.payload)
            }
        
        case CLEAR_SELECTED_WORDS:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО 
            return {
                ...state,
                selectedWords: []
            }

        case CREATE_EDUCATION_PLANS:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО
            return {
                ...state,
                scheduleTaskCard: action.serverPayload, //rename to  action. middlewarePayload
                isLoaded: true
            }

        case COLLECTING_COMMON_STATISTICS:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО
            return {
                ...state,
                trainingStatistics: [...state.trainingStatistics, action.payload]
            }

        case NEXT_TASK_COMMON:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО // LOGIC IS IDENTICAL WITH SKIP_TASK_COMMON -- SOLVE IT
            return {
                ...state,
                currentWordCounter: !state.isLastTask ? state.currentWordCounter + 1 : state.currentWordCounter,
                isLastTask: state.currentWordCounter === (state.scheduleTaskCard.length - 2), //why did i write '-2'
                currentTrainingId: state.scheduleTaskCard[state.currentWordCounter].trainingId,
                isFinishedTraining:  state.currentWordCounter === (state.scheduleTaskCard.length - 1),
            }
            
        case SKIP_TASK_COMMON:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО
            return {
                ...state,
                currentWordCounter: !state.isLastTask ? state.currentWordCounter + 1 : state.currentWordCounter,
                // currentWordCounter: state.currentWordCounter + 1,
                isFinishedTraining:  state.currentWordCounter === (state.scheduleTaskCard.length - 1),
                isLastTask: state.currentWordCounter === (state.scheduleTaskCard.length - 2), //why did i write '-2'
                currentTrainingId: state.scheduleTaskCard[state.currentWordCounter].trainingId,
                trainingStatistics: [...state.trainingStatistics, action.payload]
            }

        case SELECTING_WORD:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО
            return {
                ...state,
                selectedWords: [...state.selectedWords, action.payload]
            }

        case UNSELECTING_WORD:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО
            return {
                ...state,
                selectedWords: state.selectedWords.filter(el => el._id !== action.payload)
            }

        case SELECTING_FULL_KIT:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО
           
            return {
                ...state,
                selectedWords: action.middlewarePayload

            }

        case UNSELECTING_FULL_KIT:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО
            return {
                ...state,
                selectedWords: action.middlewarePayload
            }

        case FETCHING_WORDS:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО
            return {
                ...state,
                initialisedWords: action.initialisedWords
            }
        
        case FETCHING_WORD_SETS_NAMES:  //! КОЛИ ТИ НАТИСНИШ НА КНОПКУ ТО ВИКОНАЄТЬСЯ ТЕ, ЩО НАПИСНАО ТУТ!! І ВИКОНУВАТИМЕТЬСЯ ПІДРЯД ЯК В  КОМПОНЕНТІЙ НАПИСАНО
            return {
                ...state,
                allSetsNames: [...action.payload]

            }
        default:
            return state      
}}