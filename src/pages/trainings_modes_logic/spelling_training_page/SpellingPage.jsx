import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectingVariant, deleteLetter, nextTaskTrainingId002, hint,
         finishTraining,
         initializationTrainingID002, createTaskStatisticsObject_TrainingId002,
         skipTask_TrainingId002, getTasks, clearSplittedAnswerWord  } from '../../../redux/actions/training/modes/spelling_mode_actions';

import { collectingCommonStatistics, nextTaskCommon, skipTaskCommon,
         initializationCurrentTrainingModeId, selectingTrainingMode } from '../../../redux/actions/training/common/common_training_actions';


import { spellingSelectors, commonDataSelectors, authorizationSelectors } from '../../../redux/selectors/index'         
import SquareForLetter from './components/square_for_letter/SquareForLetter';
import ButtonForLetter from './components/buttonForLetter/ButtonForLetter';

import { ProgressScale} from '../../../components/index';
import { PauseTrainingButton } from '../components/index';

import styles from './TrainingPage.module.css';
import { Header } from '../../../components/header/Header';
import helpIcon from '../../../assets/img/help-icon.png';
import { ExitFromTrainingPopup } from '../components';
import { pausedTrainingSelectors } from '../../../redux/selectors/training/pause/training_pause_selectors';
import { ExitFromTrainingButton } from '../components/exit_from_training_popup/components';

const TrainingPageComponent = function(props) {
    const { selectingVariant, deleteLetter, nextTaskTrainingId002, hint, initializationTrainingID002, skipTask_TrainingId002,
            collectingCommonStatistics, createTaskStatisticsObject_TrainingId002,
            finishTraining, nextTaskCommon, skipTaskCommon,selectedTrainingModeId, clearSplittedAnswerWord,
            initializationCurrentTrainingModeId, isOpenCommentField, isOpenExitWindow, isLoadingPausedTraining  } = props;
            
    const { currentWord, isLastTask, hintLetter, isFinishedTraining, isLoadedScheduleTaskCards, isLoadedTasks,
            serviceWord, pressedKey, isMistake, needHint, currentWordCounter,
            questionLanguage, isLastLetter, isFinishTask, trainingId, selectedWordsIds,
            selectingTrainingMode, getTasks } = props;
    
    const [isAttemptExitFromTraining, setAttemptExitFromTraining] = React.useState(false);
    let onceLetter = false; // костиль


    React.useEffect(() => {
        if(!selectedTrainingModeId) {
            selectingTrainingMode('002') //! rename this actiion!!!!!!!!!!!!!
        }
    }, [])

    React.useEffect(() => {
        if(isLoadingPausedTraining) return
        if(!isLoadedScheduleTaskCards || !isLoadedTasks) {
            getTasks(selectedWordsIds)
        }
    }, [])

    React.useEffect(() => { //!
        if(isLoadingPausedTraining) return
        createTaskStatisticsObject_TrainingId002()
    }, [isLoadedTasks])

    React.useEffect(() => {
        function keyPressHandler(event) {
            const key = event.key
            if(key === 'Enter' && !isLastTask) {
                onNextTask(false)()
            } else if(key === ' ') {
                onNextTask(true)()
            } else if(key === 'Backspace') {
                deleteLetter()
            } else {
                selectingVariant(key)
            }
        }

        if(isOpenCommentField) return

        document.addEventListener('keydown', keyPressHandler)
        return () => {document.removeEventListener('keydown', keyPressHandler)}
    
    }, [isOpenCommentField])

    React.useEffect(() => {
        if(isLoadingPausedTraining) return
        initializationCurrentTrainingModeId(trainingId)
    }, [])

    React.useEffect(() => {
        if(isLoadingPausedTraining) return
        if(selectedTrainingModeId === '003') {
            initializationTrainingID002() //! rename because it is only for mixing mode
        }
    }, [currentWordCounter])

    if(!isLoadedScheduleTaskCards) {
        return 'Заванатаження, зачекайте!'
    }

    const onNextTask = () => { 
            collectingCommonStatistics('002');
            nextTaskCommon();
            nextTaskTrainingId002();
            createTaskStatisticsObject_TrainingId002();
            if(selectedTrainingModeId === '003') {
                clearSplittedAnswerWord();
        }
}

    const onFinishTraining = () => finishTraining()

    const onSkipTask = () => {
        skipTaskCommon();
        skipTask_TrainingId002();
        createTaskStatisticsObject_TrainingId002()
        if(selectedTrainingModeId === '003') {
            clearSplittedAnswerWord();
        }
    }


    const onAddLetter = event => selectingVariant(event.target.value);
    

    const squaresArr = [...pressedKey].map((el, idx) => {
        return <SquareForLetter key = {idx} text = {el}/>
    })

    const buttonArr = [...serviceWord].map((el, idx) => {
        if(needHint && el === hintLetter && !onceLetter) {
            onceLetter = true
            return <ButtonForLetter needHint = {true} key = {idx} onClickHandler = {onAddLetter} letter = {el} />
        }

        return <ButtonForLetter key = {idx} onClickHandler = {onAddLetter} letter = {el} />
    })

       if(isOpenExitWindow) {
        return <ExitFromTrainingPopup onContinueTraining = {setAttemptExitFromTraining}/>
    }


    return (
        <div>
            <Header />
            ПОСТАВИТИ НА КНОПКУ ЗАКІНЧЕННЯ ТРЕНУВАННЯ ЗАЧИСТКУ НА СТЕЙТ ЩОБ МОЖНА БУЛО ВИБИРАТИ ВІДРАЗУ НОВУ ТРЕНУВАННЯ
            <PauseTrainingButton />
            <ExitFromTrainingButton />
            <div className = {styles['main-container']}>
            <div className = {isMistake  ? styles.error : styles.mainStyles}>
                {
                    !isFinishedTraining 
                        ?
                    <div className="">
                        <div className = {styles.emptySquares}>
                            {squaresArr}
                        </div>
                        <div className = {styles.offerLetter}>
                            {buttonArr}
                        </div>
                        {/* <div className = {styles.translatedText}> */}
                        <div>
                            {currentWord[questionLanguage]}
                        </div>
                    </div>
                        :
                    null
                }
                
                

                {
                    isFinishedTraining
                                    ? <NavLink onClick = {onFinishTraining}
                                               to = '/result'
                                               className = {styles['next-task-button']}
                                      > 
                                               Результати
                                      </NavLink>
                                    : null
                }

                {
                    isFinishTask 
                                    ? <button className = {styles['next-task-button']} 
                                              onClick = {onNextTask}
                                            >
                                                next word
                                            </button>
                                    : null
                }
               
                {
                !isLastLetter && !isFinishedTraining
                    ? <button className = {styles['skip-button']} onClick = {onSkipTask}>Пропустити</button>
                    : null 
                }



                {!isLastLetter && !isFinishedTraining ? <button className = {styles['help-button']} onClick = {() => hint()}>
                    <img src = {helpIcon} alt=""/>
                </button> : null}
                <ProgressScale />
                </div>
            </div>
        </div>
    )
}





const mapStateToProps = function(state) {
    return {
        currentWord: commonDataSelectors.getCurrentWord(state),
        isLastTask:  commonDataSelectors.isLastTask(state),
        questionLanguage: commonDataSelectors.getQuestionLanguage(state),
        isFinishedTraining: commonDataSelectors.isFinishedTraining(state),
        selectedWordsIds: commonDataSelectors.getSelectedWordsIds(state),
        selectedTrainingModeId: commonDataSelectors.getSelectedTrainingModeId(state),
        currentWordCounter: commonDataSelectors.getCurrentWordCounter(state),
        isLoadingPausedTraining: commonDataSelectors.isLoadingPausedTraining(state),

        isOpenCommentField: pausedTrainingSelectors.isOpenCommentField(state),
        isOpenExitWindow: pausedTrainingSelectors.isOpenExitWindow(state),

        serviceWord:  spellingSelectors.getSplittedAnswerWord(state),
        pressedKey:  spellingSelectors.getPressedKey(state),
        isMistake:  spellingSelectors.isMistake(state),
        hintLetter:  spellingSelectors.getHintLetter(state),
        needHint:  spellingSelectors.getNeedHint(state),
        isLastLetter:  spellingSelectors.isLastLetter(state),
        isFinishTask: spellingSelectors.isFinishTask(state),
        trainingId: spellingSelectors.getTrainingId(state),
        isLoadedScheduleTaskCards: state.trainingCommonData.isLoaded,
        isLoadedTasks: state.trainingCommonData.spellingState.isLoadedTasks,
        // userId: authorizationSelectors.getUserId(state),
    }
}

const mapDispatchToProps = { selectingVariant, deleteLetter, nextTaskTrainingId002, skipTask_TrainingId002,
                             skipTaskCommon, nextTaskCommon, hint, initializationTrainingID002, collectingCommonStatistics,
                             createTaskStatisticsObject_TrainingId002, finishTraining,selectingTrainingMode,
                             initializationCurrentTrainingModeId, getTasks, clearSplittedAnswerWord }

const WithRouterTrainingPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(TrainingPageComponent));

export default WithRouterTrainingPage
