import { mixingElement } from '../../../utils/mixers/mixers';

import { SELECTING_TASK_VARIANT_TRAINING_ID_002, DELETE_LETTER, NEXT_TASK_TRAINING_ID_002, FINISH_TRAINING_ID_002,
         INITIALIZATION_TRAINING_ID_002, CREATE_STATISTICS_OBJECT_TRAINING_ID_002, CLEAR_SPLITTED_ANSWER_WORD,
         HINT, SKIP_TASK_TRAINING_ID_002, GET_TASKS, FETCHING_MIXED_TASKS, PAUSE_TRAINING, CONTINUE_TRAINING_ID002 } from '../../action_types/index'


const statisticObjectCreator = function({selfState, action, currentWord}, needHint = false, skipped = false) { 
    const letterCounter = selfState.letterCounter
    const correctVariant = currentWord[currentWord.answerLang][selfState.letterCounter]
    const isInitializadeTaskVariants = Boolean(selfState.currentTaskStatistics.answerDetails[letterCounter]) //rename
    const isCorrectVariant = action.selectedVariant === correctVariant;

    const taskVariantsItemTemplate = {
        correctVariant: '',
        choosenVariants: [],
        needHint
    }
    
    const newStatisticsObject = { 
        word: currentWord,
        taskStart: selfState.currentTaskStatistics.taskStart,
        taskEnd: selfState.isLastLetter,
        trainingId: selfState.trainingId,
        isSkipped: false,
        needHint: selfState.currentTaskStatistics.needHint,
        isMistakeInTheTask: selfState.currentTaskStatistics.isMistakeInTheTask,
        answerDetails: [
            ...selfState.currentTaskStatistics.answerDetails,
        ],
        timestamps: {start: selfState.currentTaskStatistics.timestamps.start,
                     end: selfState.isLastLetter ? Date.now(new Date()) : null,
                     amount: selfState.isLastLetter ? ( Date.now(new Date()) - selfState.currentTaskStatistics.timestamps.start ) : null,
                    },
    }

    if(!selfState.currentTaskStatistics.needHint && selfState.needHint) {
        newStatisticsObject.needHint = true
    }

    if(!selfState.currentTaskStatistics.isMistakeInTheTask && !isCorrectVariant) {
        newStatisticsObject.isMistakeInTheTask = true
    }

    
    newStatisticsObject.answerDetails[letterCounter] = taskVariantsItemTemplate;
    newStatisticsObject.answerDetails[letterCounter].correctVariant = correctVariant;
    newStatisticsObject.taskStart = true;
    

    if(!isInitializadeTaskVariants) {
        newStatisticsObject.answerDetails[letterCounter].choosenVariants = (needHint) ? ['hint'] : [action.selectedVariant]
    }

    if(isInitializadeTaskVariants) {
        newStatisticsObject.answerDetails[letterCounter].choosenVariants = [
                                                                        ...selfState.currentTaskStatistics.answerDetails[letterCounter].choosenVariants,
                                                                        (needHint) ? 'hint' : action.selectedVariant
                                                                     ]
    }

    return {...newStatisticsObject}

}



export let spellingState = {
        trainingId: '002',
        currentTaskStatistics: {},
        hintLetter: null,
        isFinishTask: false,
        isLastLetter: false,
        isMistake: false,
        letterCounter: 0, //currentLetter
        needHint: false,
        pressedKey: '',
        splittedAnswerWord: [], //rename to task
        tasks: [],
        isLoadedTasks: false,
}


export const spelling = function(state, action) {
    const selfState = state.spellingState;
    const currentWord = state.scheduleTaskCard[state.currentWordCounter];
    const mainParametersForCreatorStatisticObject = {selfState, action, currentWord};

    switch(action.type) {
        case PAUSE_TRAINING: 
            return {
                ...selfState,
                currentTaskStatistics: {},
                hintLetter: null,
                isFinishTask: false,
                isLastLetter: false,
                isMistake: false,
                letterCounter: 0, //currentLetter
                needHint: false,
                pressedKey: '',
                splittedAnswerWord: [], //rename to task
                tasks: [],
                isLoadedTasks: false,
            }
        
        case CONTINUE_TRAINING_ID002: 
            const {tasks, task, currentTaskStatistics, currentLetter} = action.middlewarePayload;
            console.log('yepp')
            return {
                ...selfState,
                tasks,
                splittedAnswerWord: task,
                isLoadedTasks: true,
                currentTaskStatistics,
                letterCounter: currentLetter
            }

        case CLEAR_SPLITTED_ANSWER_WORD:
            return {
                ...selfState,
                splittedAnswerWord: [],
            }

        case FETCHING_MIXED_TASKS: 
            return {
                ...selfState,
                tasks: [...action.serverPayload.tasks],
                // splittedAnswerWord: [...action.serverPayload.tasks[0]], //transfer to indvidual dispatch
                isLoadedTasks: true,

            }
        

        case GET_TASKS:
            return {
                ...selfState,
                tasks: [...action.serverPayload.tasks],
                splittedAnswerWord: [...action.serverPayload.tasks[0]], //transfer to indvidual dispatch
                isLoadedTasks: true,
            }
        
        case FINISH_TRAINING_ID_002:
            return {
                trainingId: '002',
                currentTaskStatistics: {},
                hintLetter: null,
                isFinishTask: false,
                isLastLetter: false,
                isMistake: false,
                letterCounter: 0,
                needHint: false,
                pressedKey: '',
                splittedAnswerWord: [],
            }

        case CREATE_STATISTICS_OBJECT_TRAINING_ID_002:
            return {
                ...selfState,
                currentTaskStatistics: {
                    word: currentWord,
                    trainingId: selfState.trainingId,
                    taskStart: false,
                    taskEnd: false,
                    isSkipped: false, 
                    isMistakeInTheTask: false,
                    needHint: false,
                    task: selfState.isLoadedTasks ? selfState.tasks[state.currentWordCounter] : [],
                    answerDetails: [
                        {
                            correctVariant: '',
                            choosenVariants: [],
                            needHint: false
                        }
                    ],
                    timestamps: {
                                    start: Date.now(new Date()),
                                    end: null,
                                    amount: null,
                                },
                    
                }
            }

        case NEXT_TASK_TRAINING_ID_002:
            return {
                ...selfState,
                splittedAnswerWord: selfState.tasks[state.currentWordCounter],
                pressedKey: '',
                letterCounter: 0,
                currentTaskStatistics: {task: selfState.tasks[state.currentWordCounter]},
                hintLetter: !state.isLastTask ? state.scheduleTaskCard[state.currentWordCounter][currentWord.answerLang][0] : '',
                needHint: false,
                isLastLetter: false,
                isFinishTask: false,
            }

        case HINT:
            return {
                ...selfState,
                hintLetter: currentWord[currentWord.answerLang][selfState.letterCounter],
                needHint: true,
                currentTaskStatistics: {...selfState.currentTaskStatistics, ...statisticObjectCreator(mainParametersForCreatorStatisticObject, true)} ,
            }
            
        case SKIP_TASK_TRAINING_ID_002:
            return {
                ...selfState,
                splittedAnswerWord: selfState.tasks[state.currentWordCounter],
                pressedKey: '',
                letterCounter: 0,
                currentTaskStatistics: {...statisticObjectCreator(mainParametersForCreatorStatisticObject, false, true), task: selfState.tasks[state.currentWordCounter]},
                hintLetter: !state.isLastTask ? state.scheduleTaskCard[state.currentWordCounter][currentWord.answerLang][0] : '',
                needHint: false,
                isLastLetter: false,
                isFinishTask: false //! для чого це?
            }

        case INITIALIZATION_TRAINING_ID_002:
            return {
                ...selfState,
                splittedAnswerWord: selfState.tasks[state.currentWordCounter],
            }
        
        case SELECTING_TASK_VARIANT_TRAINING_ID_002: //middleware
            const wordCopy = [...selfState.splittedAnswerWord].slice() // should make it in the middleware
            let position = selfState.splittedAnswerWord.indexOf(action.selectedVariant)// should make it in the middleware
            const isRightAnswer = action.selectedVariant === currentWord[currentWord.answerLang][selfState.letterCounter];
            
            if(isRightAnswer){
                wordCopy.splice(position, 1)
            } else {
                return {
                    ...selfState,
                    isMistake: true,

                    currentTaskStatistics:  {...selfState.currentTaskStatistics, ...statisticObjectCreator(mainParametersForCreatorStatisticObject)},

                    hintLetter: currentWord[currentWord.answerLang][selfState.letterCounter],
                }
            }

            return {
                ...selfState, 
                pressedKey: selfState.pressedKey + action.selectedVariant,
                splittedAnswerWord: wordCopy.join(''),
                letterCounter: selfState.letterCounter + 1,
                isMistake: false,
                // currentTaskStatistics:  {...selfState.currentTaskStatistics, }statisticObjectCreator(mainParametersForCreatorStatisticObject),
                currentTaskStatistics: {...selfState.currentTaskStatistics, ...statisticObjectCreator(mainParametersForCreatorStatisticObject)},



                hintLetter: currentWord[currentWord.answerLang][selfState.letterCounter + 1],
                needHint: false,
                isLastLetter: selfState.splittedAnswerWord.length <= 2, //постійно стараюсь перегнати реакс, що з цим робити??
                isFinishTask: selfState.splittedAnswerWord.length === 1
            }

        case DELETE_LETTER:
            const pressedWordCopy = [...selfState.pressedKey]
            const deletedLetter = pressedWordCopy.splice((pressedWordCopy.length - 1), 1)

            return {
                ...selfState,
                pressedKey: pressedWordCopy.join(''),
                splittedAnswerWord: [...selfState.splittedAnswerWord, ...deletedLetter],
                letterCounter: selfState.letterCounter > 0 ? selfState.letterCounter - 1 : 0, 
                hintLetter: currentWord[selfState.letterCounter]
            }
        
        
            
            default:
                return selfState
    }
}