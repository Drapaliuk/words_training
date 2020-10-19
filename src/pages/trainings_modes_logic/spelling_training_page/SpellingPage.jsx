import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectingVariant, deleteLetter, nextTaskTrainingId002, hint, finishTraining,
         initialServiceWord, createTaskStatisticsObject_TrainingId002, skipTask_TrainingId002,  } from '../../../redux/actions/spelling_test_actions'; //! 
import { collectingCommonStatistics, nextTaskCommon, skipTaskCommon,
         initializationCurrentTrainingModeId, createEducationPlan } from '../../../redux/actions/common_data_actions'; //!
import { spellingSelectors, commonDataSelectors } from '../../../redux/selectors/index'         
import SquareForLetter from './components/square_for_letter/SquareForLetter';
import ButtonForLetter from './components/buttonForLetter/ButtonForLetter';

import {ProgressScale} from '../../../components/index';




import styles from './TrainingPage.module.css';
import { Header } from '../../../components/header/Header';
import helpIcon from '../../../assets/img/help-icon.png';
import { ExitFromTrainingPopup } from '../components';

const TrainingPageComponent = function(props) {
    const { selectingVariant, deleteLetter, nextTaskTrainingId002, hint, initialServiceWord, skipTask_TrainingId002,
            collectingCommonStatistics, createTaskStatisticsObject_TrainingId002, createEducationPlan,
            finishTraining, nextTaskCommon, skipTaskCommon, initializationCurrentTrainingModeId } = props;
            
    const { currentWord, isLastTask, hintLetter, isFinishedTraining, isLoaded,
            serviceWord, pressedKey, isMistake, needHint, selectedWords, scheduleTaskCard,
            questionLanguage, isLastLetter, isFinishTask, trainingId } = props;
    
    const [isAttemptExitFromTraining, setAttemptExitFromTraining] = React.useState(false);
    let onceLetter = false; // костиль

    React.useEffect(() => {
        if(!isLoaded) {
            createEducationPlan(selectedWords)
        }
    }, []);

    React.useEffect(() => {
        if(isLoaded) {
            initialServiceWord()
        }
    }, [])

    React.useEffect(() => {
        createTaskStatisticsObject_TrainingId002()
    }, [])

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

        document.addEventListener('keydown', keyPressHandler)

        return () => {document.removeEventListener('keydown', keyPressHandler)}
    }, [])

    React.useEffect(() => {
        initializationCurrentTrainingModeId(trainingId)
    }, [])

    if(!isLoaded) {
        return 'good liuck'
    }

    const onNextTask = () => { 
        return () => {
            collectingCommonStatistics('002')
            nextTaskTrainingId002();
            nextTaskCommon();
            createTaskStatisticsObject_TrainingId002();
        }
    }

    const onFinishTraining = () => {
        finishTraining()
    }

    const onSkipTask = () => {
        skipTask_TrainingId002()
        skipTaskCommon()
        createTaskStatisticsObject_TrainingId002()

    }


    let onAddLetter = (event) => {
        selectingVariant(event.target.value);
    }
    // const [isAttemptExitFromTraining, setAttemptExitFromTraining] = React.useEffect(false);
    if(isAttemptExitFromTraining) {
        return <ExitFromTrainingPopup onContinueTraining = {setAttemptExitFromTraining}/>
    }
    

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



    return (
        <div>
            <Header />
            <button onClick = {() => setAttemptExitFromTraining(true)}>exit</button>
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
                        <div className = {styles.translatedText}>
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
                                              onClick = {onNextTask(false)}
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
        selectedWords: commonDataSelectors.getSelectedWords(state),
        scheduleTaskCard: commonDataSelectors.getScheduleTaskCard(state),

        serviceWord:  spellingSelectors.getSplittedAnswerWord(state),
        pressedKey:  spellingSelectors.getPressedKey(state),
        isMistake:  spellingSelectors.isMistake(state),
        hintLetter:  spellingSelectors.getHintLetter(state),
        needHint:  spellingSelectors.getNeedHint(state),
        isLastLetter:  spellingSelectors.isLastLetter(state),
        isFinishTask: spellingSelectors.isFinishTask(state),
        trainingId: spellingSelectors.getTrainingId(state),
        isLoaded: state.trainingCommonData.isLoaded,
        
    }
}

const mapDispatchToProps = { selectingVariant, deleteLetter, nextTaskTrainingId002, skipTask_TrainingId002, createEducationPlan,
                             skipTaskCommon, nextTaskCommon, hint, initialServiceWord, collectingCommonStatistics,
                             createTaskStatisticsObject_TrainingId002, finishTraining, initializationCurrentTrainingModeId }

const WithRouterTrainingPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(TrainingPageComponent));

export default WithRouterTrainingPage
