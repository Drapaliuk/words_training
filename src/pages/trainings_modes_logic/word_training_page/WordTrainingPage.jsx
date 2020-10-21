import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import styles from './TrainingByWordPage.module.css';
import {wordTestSelectors, commonDataSelectors} from '../../../redux/selectors/index'; //! ?
import {fetchingWordsForMixing, selectingVariant, nextTaskTrainingId001,
        createVariantList, hinting, skipTaskTrainingId001,
        initializationTaskStaticsObject_TrainingId001, fetchingTaskCards} from '../../../redux/actions/word_test_actions';


import { collectingCommonStatistics, skipTaskCommon, nextTaskCommon,
        initializationCurrentTrainingModeId, createEducationPlan } from '../../../redux/actions/common_data_actions'; //!
import {VariantListItem} from './component/VariantListItem'
import {ProgressScale} from '../../../components/index';
import {Header} from '../../../components/index';
import helpIcon from '../../../assets/img/help-icon.png';
import {VariantList} from './component/VariantList'; //! чомуьсь не працює


//! Перебрати всю логіку, логіка дуже уйобішна, ніхуя не ясно

const TrainingByWordPage = function(props) {
    const { currentWord, isTrueAnswer, variantList, needHint, selectedWords,
         selectedWordsIds, trainingStatistcs, questionLang, answerWord, isLoadedScheduleTaskCard, isLoadedVariantList,
          answerLang, trainingId, scheduleTaskCard, isFinishedTraining, wordsForMixing, currentTask } = props;

    const { fetchingWordsForMixing, skipTaskCommon, nextTaskCommon, createEducationPlan, fetchingTaskCards,
         skipTaskTrainingId001, selectingVariant, nextTaskTrainingId001, initializationCurrentTrainingModeId,
          createVariantList, hinting, collectingCommonStatistics, initializationTaskStaticsObject_TrainingId001 } = props;
    
    let hintWordCounter = 0; //зробити юз рефом
    
    React.useEffect(() => {
        fetchingTaskCards(selectedWordsIds)
    }, [])

    React.useEffect(() => {
        initializationCurrentTrainingModeId(trainingId)
    }, [])
 
    React.useEffect(() => {
        initializationTaskStaticsObject_TrainingId001()
    }, [isLoadedScheduleTaskCard, isLoadedVariantList]) // тому що фетч scheduleTaskCard це асинхронна операція, 
                                                //і якщо зробити одноразовий виклик, то в перше слово не прийде актуальна інфа



    if(!isLoadedScheduleTaskCard && !isLoadedVariantList) {
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

    //зробити всы ці кнопки як загальний компонент і перевикористовувавти + дати можливість давати в нього колбек з власною логікою

    return (
        <div>
            <Header />
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
        selectedWords: commonDataSelectors.getSelectedWords(state),
        isLoadedScheduleTaskCard: state.trainingCommonData.isLoaded,
        selectedWordsIds: commonDataSelectors.getSelectedWordsIds(state),

        answerWord: wordTestSelectors.getAnswerWord(state),
        questionWord: wordTestSelectors.getQuestionWord(state),
        questionLang: wordTestSelectors.getQuestionLang(state),
        answerLang: wordTestSelectors.getAnswerLang(state),
        trainingId: wordTestSelectors.getTrainingId(state),
        wordsForMixing: state.trainingCommonData.wordTestState.wordsForMixing,
        isLoadedVariantList: state.trainingCommonData.wordTestState.isLoaded,

        isTrueAnswer: wordTestSelectors.isTrueAnswer(state),
        variantList: wordTestSelectors.getVariantList(state), 
        needHint: wordTestSelectors.needHint(state),
        currentTask: wordTestSelectors.getCurrentTask(state)


    }
};



const mapDispatchToProps = { fetchingWordsForMixing, nextTaskCommon, skipTaskCommon, initializationCurrentTrainingModeId,
                             skipTaskTrainingId001, selectingVariant, nextTaskTrainingId001, createEducationPlan,
                             createVariantList, hinting, collectingCommonStatistics,
                             initializationTaskStaticsObject_TrainingId001, fetchingTaskCards };

export default connect(mapStateToProps, mapDispatchToProps)(TrainingByWordPage);
















    // React.useEffect(() => {
    //     if(wordsForMixing.length === 0) {
    //         fetchingWordsForMixing()
    //     }
    // }, []) 

    // React.useEffect(() => {
    //     if(!isLoaded) {
    //         createEducationPlan(selectedWords)
    //     }
    // }, [])

    // React.useEffect(() => {
    //     if(isLoaded) {
    //         createVariantList()
    //     }
    // }, [scheduleTaskCard]) // review this logic