import { SELECTING_TASK_VARIANT_TRAINING_ID_001, NEXT_TASK_TRAINING_ID_001,
         CREATE_VARIANT_LIST, SKIP_TASK_TRAINING_ID_001,
         FIFTY_FIFTY, FETCH_WORDS_FOR_MIXING, FINISH_TRAINING_ID_001,
         CREATE_STATISTICS_OBJECT_TRAINING_ID_001, FETCHING_TASK_CARDS,
         FETCHING_MIXED_TASKS, 
         PAUSE_TRAINING,
         CONTINUE_TRAINING} from '../../action_types/index';

const statisticObjectCreator = function({selfState, state, action, currentWord}, ) { //skip зробити тут а не в мідлварі
    const questionLanguage =  state.scheduleTaskCard[state.currentWordCounter].questionLang
    const isCorrectVariant = state.scheduleTaskCard[state.currentWordCounter][questionLanguage] === action.selectedVariant[questionLanguage]
    const needHint = selfState.needHint;
    
    const newStatisticsObject = { 
        word: currentWord,
        trainingId: state.currentTrainingModeId,
        taskStart: true,
        taskEnd: isCorrectVariant,
        task: selfState.variantList[state.currentWordCounter],
        isSkipped: false,
        isMistakeInTheTask: selfState.currentTaskStatistics.isMistakeInTheTask,
        answerDetails: [
            ...selfState.currentTaskStatistics.answerDetails, 
            needHint && !selfState.currentTaskStatistics.answerDetails.includes('hint') 
                            ? 'hint' 
                            : action.selectedVariant,
        ],
        
        needHint: selfState.currentTaskStatistics.needHint,
        timestamps: {start: selfState.currentTaskStatistics.timestamps.start,
                     end: isCorrectVariant ? Date.now(new Date()) : null,
                     amount: isCorrectVariant ? ( Date.now(new Date()) - selfState.currentTaskStatistics.timestamps.start ) :  null
                    },
    }

    if(!selfState.currentTaskStatistics.isMistakeInTheTask && !isCorrectVariant) {
        newStatisticsObject.isMistakeInTheTask = true
    }

    return {...newStatisticsObject}
}

export const wordTestState = { // why did i exported this object?
    trainingId: '001',
    currentTaskStatistics: {},
    needHint: false,
    isLastTask: false,
    isTrueAnswer: false,
    variantList: [], //rename to task
    wordsForMixing: [], //!delete
    justDoIt: [], //!delete
    isLoadedTasks: false,
}



export const wordTestReducer = function (state, action) { // why did i write so? where default argument?
    const selfState = state.wordTestState;
    const currentWordCounter = state.currentWordCounter;
    const currentWord = state.scheduleTaskCard[state.currentWordCounter];
    const mainParametersForCreatorStatisticObject = {selfState, state, action, currentWord}
    switch(action.type) {
        case PAUSE_TRAINING:
            return {
                ...selfState,
                currentTaskStatistics: {},
                variantList: [],
                isLoadedTasks: false,
            }
        case CONTINUE_TRAINING: 
            const {currentTaskStatistics, task} = action.serverPayload;
            return {
                ...selfState,
                isLoadedTasks: true,
                variantList: task,
                currentTaskStatistics
            }

        case FETCHING_MIXED_TASKS: 
        return {
            ...selfState,
            variantList: [...action.serverPayload.tasks],
            isLoadedTasks: true
        }

        case FETCHING_TASK_CARDS:
            return {
                ...state,
                variantList: action.serverPayload.variantList,
                isLoadedTasks: true
                
            }

        case CREATE_STATISTICS_OBJECT_TRAINING_ID_001: 
            return {
                ...selfState,
                currentTaskStatistics: {
                    word: currentWord,
                    trainingId: state.currentTrainingModeId,
                    taskStart: false,
                    taskEnd: false,
                    isSkipped: false,
                    task: selfState.variantList[state.currentWordCounter],
                    isMistakeInTheTask: false,
                    answerDetails: [],
                    needHint: false, 
                    timestamps: {
                                    start: Date.now(new Date()),
                                    end: null,
                                    amount: null,
                                },
                    
                }
            }

        case FINISH_TRAINING_ID_001: 
            return {
                ...selfState
            }

        case SELECTING_TASK_VARIANT_TRAINING_ID_001:
            const questionLanguage =  state.scheduleTaskCard[state.currentWordCounter].questionLang
            const isTrueAnswer = state.scheduleTaskCard[state.currentWordCounter][questionLanguage] === action.selectedVariant[questionLanguage]
            
            return {
                ...selfState,
                isTrueAnswer: isTrueAnswer,
                currentTaskStatistics: statisticObjectCreator(mainParametersForCreatorStatisticObject),
            }

        case FETCH_WORDS_FOR_MIXING: 
            return {
                ...selfState,
                wordsForMixing: [...action.payload] //action.serverPayload
        }
        
        case FIFTY_FIFTY: //rename to hint
            return {
                ...selfState,
                needHint: true,
                currentTaskStatistics: {...selfState.currentTaskStatistics, needHint: true}
        }

        case CREATE_VARIANT_LIST: // maybe you should create it in the middleware or on the serverside?)))
            return {
                ...selfState,
                variantList: [...action.payload],
        }


        case NEXT_TASK_TRAINING_ID_001:
            return {
                ...selfState,
                isTrueAnswer: false,
                // currentTaskStatistics: {},
                // variantList: [],
                needHint: false,
                isLastTask: currentWordCounter === (state.selectedWords.length - 2)
        }
            
        case SKIP_TASK_TRAINING_ID_001: 
            return {
                ...selfState,
                isTrueAnswer: false,
                currentTaskStatistics: {},
                // variantList: [],
                needHint: false,
                isLastTask: currentWordCounter === (state.selectedWords.length - 2)

        }

         default:
            return selfState
    }
}