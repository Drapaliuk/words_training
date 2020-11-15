import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './TrainingByWordPage.module.css';
import { wordTestSelectors, commonDataSelectors } from '../../../redux/selectors/index'; //! ?
import { selectingVariant, nextTaskTrainingId001,
        hinting, skipTaskTrainingId001,
        initializationTaskStaticsObject_TrainingId001, fetchingTaskCards } from '../../../redux/actions/training/modes/word_mode_actions';

import { collectingCommonStatistics, skipTaskCommon, nextTaskCommon,
         initializationCurrentTrainingModeId,  selectingTrainingMode, loadingPausedTraining } from '../../../redux/actions/training/common/common_training_actions'; //!
import {VariantListItem} from './component/VariantListItem'
import {ProgressScale} from '../../../components/index';
import {Header} from '../../../components/index';
import helpIcon from '../../../assets/img/help-icon.png';
// import { VariantList } from './component/VariantList'; //! чомуьсь не працює
import { pausedTrainingSelectors,  } from '../../../redux/selectors/training/pause/training_pause_selectors';
import { ExitFromTrainingPopup, PauseTrainingButton } from '../components';
// import { openExitWindow } from '../../../redux/actions/training/pause/paused_training_actions';
import { ExitFromTrainingButton } from '../components/exit_from_training_popup/components';



const TrainingByWordPage = function(props) {
    const { currentWord, isTrueAnswer, needHint,
            selectedWordsIds, trainingStatistcs, questionLang, answerWord, isLoadedScheduleTaskCards, isLoadedTasks,
            answerLang, trainingId, scheduleTaskCard, isFinishedTraining, currentTask,
            selectedTrainingModeId, isLoadingPausedTraining } = props;

    const { skipTaskCommon, nextTaskCommon,  fetchingTaskCards,
            skipTaskTrainingId001, selectingVariant, nextTaskTrainingId001, initializationCurrentTrainingModeId,
            hinting, collectingCommonStatistics, initializationTaskStaticsObject_TrainingId001,
            selectingTrainingMode, isOpenExitWindow
          } = props;
    
    let hintWordCounter = 0; //зробити юз рефом

    React.useEffect(() => {
        if(!selectedTrainingModeId) {
            selectingTrainingMode('001')
        }
    }, [])
    
    React.useEffect(() => {
        if(isLoadingPausedTraining) return
        if(!isLoadedScheduleTaskCards || !isLoadedTasks) {
            fetchingTaskCards(selectedWordsIds)
        }
    }, [])

    React.useEffect(() => {
        initializationCurrentTrainingModeId(trainingId)
    }, [])
 
    React.useEffect(() => {
        initializationTaskStaticsObject_TrainingId001()
    }, [isLoadedScheduleTaskCards, isLoadedTasks]) // тому що фетч scheduleTaskCard це асинхронна операція, 
                                                        // і якщо зробити одноразовий виклик, то в перше слово не прийде актуальна інфа



    if(!isLoadedScheduleTaskCards && !isLoadedTasks) {
        return 'good luck'
    }

    const onHintHandler = () => { //!
        hinting()
    }

    const onSelectingVariant = (selectedVariant) => {
        return () => {
            selectingVariant(selectedVariant)
        }
    }

    const onNextTask = () => () => { 
            collectingCommonStatistics('001');
            nextTaskTrainingId001();
            nextTaskCommon();
            initializationTaskStaticsObject_TrainingId001()
            hintWordCounter = 0;
    }


    const onSkipTask = () => {
        skipTaskCommon();
        skipTaskTrainingId001();
        initializationTaskStaticsObject_TrainingId001()
        hintWordCounter = 0;
    }

    if(isLoadingPausedTraining) return '!'

    const Task = currentTask.map((el, idx) => {
        const isRightWord = el._id === currentWord._id; //чому тут 2 однакові змінні isTrueAnswer isRightWord

        if(isRightWord) {
            return <VariantListItem key = { el._id + idx } 
                                    onClick = { onSelectingVariant(el) }
                                    value = { el[questionLang] }
                                    text = { answerWord  }
                                    isTrueAnswer = { isTrueAnswer } />
        }

        if(needHint && hintWordCounter < 2 && !isRightWord){
            hintWordCounter++
            return <VariantListItem key = { el._id + idx } 
                                    value = { el[questionLang] }
                                    onClick = { onSelectingVariant(el) }
                                    isDisabled = { true } 
                                    text = {'  '}
                                    />
        }

        return <VariantListItem key = { el._id + idx} 
                                isDisabled = { isTrueAnswer }
                                value = { el[questionLang] }
                                onClick = { onSelectingVariant(el) } 
                                text = { el[answerLang] }
                                isTrueAnswer = {isRightWord}
                                />
    })



    if(isOpenExitWindow) { //! rename
        return <ExitFromTrainingPopup /> //!rename
    }
    
    return (
        <div>
            <Header />
                <PauseTrainingButton />
                <ExitFromTrainingButton />
                <div className = {styles.mainStyles}>
                    <div className="">
                        {
                            !isFinishedTraining 
                                ? 
                            <div className="">
                                <div className = {styles.trueAnswerField}>
                                    { isTrueAnswer 
                                        ? <p>{currentWord[currentWord.answerLang]}</p> 
                                        : '----'
                                    }
                                </div>
                                <div className={styles.questionWord}>
                                    {currentWord[currentWord.questionLang]}
                                </div>
                                <ul className = {styles['variants-container']}>
                                    {Task}
                                </ul>
                            </div>
                            :
                            null
                        }


                        <div className = {styles['buttons-container']}> 
                            { isTrueAnswer
                                ?   <button onClick = {onNextTask(false)} 
                                          className = {styles['next-task-button']}
                                    > 
                                        Далі 
                                    </button> 
                                : null
                            }

                            {
                                isFinishedTraining
                                                ? <NavLink 
                                                        to = '/result'
                                                        className = {styles['next-task-button']}
                                                > 
                                                        Результати
                                                </NavLink>
                                                : null
                            }
                            
                            { !isTrueAnswer && !isFinishedTraining
                                ? <button onClick = {onSkipTask} className = {styles['skip-button']}> Пропустити </button> 
                                : null
                            }

                            { hintWordCounter < 2 && !isFinishedTraining
                                ? <button className = {styles['help-button']} onClick = {onHintHandler}> <img src = {helpIcon} alt=""/> </button> 
                                : null
                            }
                        </div>
                        
                    </div>
                    <ProgressScale tasksAmount = {scheduleTaskCard}  answerArray = {trainingStatistcs}/>
                </div>
            </div>
    )
};

let mapStateToProps = function(state) {
    return {
        currentWord: commonDataSelectors.getCurrentWord(state),
        isLastTask: commonDataSelectors.isLastTask(state),
        translatingLanguages: commonDataSelectors.getTranslatingLanguages(state),
        trainingStatistcs: commonDataSelectors.getTrainingStatistics(state),
        scheduleTaskCard: commonDataSelectors.getScheduleTaskCard(state),
        isFinishedTraining: commonDataSelectors.isFinishedTraining(state),
        isLoadedScheduleTaskCards: state.trainingCommonData.isLoaded,
        selectedWordsIds: commonDataSelectors.getSelectedWordsIds(state),
        selectedTrainingModeId: commonDataSelectors.getSelectedTrainingModeId(state),
        isLoadingPausedTraining: commonDataSelectors.isLoadingPausedTraining(state),


        isOpenExitWindow: pausedTrainingSelectors.isOpenExitWindow(state),

        answerWord: wordTestSelectors.getAnswerWord(state),
        questionWord: wordTestSelectors.getQuestionWord(state),
        questionLang: wordTestSelectors.getQuestionLang(state),
        answerLang: wordTestSelectors.getAnswerLang(state),
        trainingId: wordTestSelectors.getTrainingId(state),
        isLoadedTasks: state.trainingCommonData.wordTestState.isLoadedTasks,

        isTrueAnswer: wordTestSelectors.isTrueAnswer(state),
        needHint: wordTestSelectors.needHint(state),
        currentTask: wordTestSelectors.getCurrentTask(state)


    }
};



const mapDispatchToProps = { nextTaskCommon, skipTaskCommon, initializationCurrentTrainingModeId,
                             skipTaskTrainingId001, selectingVariant, nextTaskTrainingId001, 
                             hinting, collectingCommonStatistics, selectingTrainingMode,
                             initializationTaskStaticsObject_TrainingId001, fetchingTaskCards };

export default connect(mapStateToProps, mapDispatchToProps)(TrainingByWordPage);