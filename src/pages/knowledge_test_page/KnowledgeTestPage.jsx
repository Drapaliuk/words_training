import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonSelectors, vocabularyTestSelectors } from '../../redux/selectors/index';
import { addAnswer, nextTask, fetchVocabularyTest } from '../../redux/actions/knowledge_tests/knowledge_tests_actions';
import styles from './KnowledgeTest.module.css';
import {Header} from '../../components/index';
import ProgressSchale from './components/progress_schale/ProgressScale';
import yes from '../../assets/img/yes.png';
import no from '../../assets/img/no.png';
import { Redirect } from 'react-router-dom';
import { translatableText } from '../../languages/instances/knowledge_test';

export function KnowledgeTestPage() {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => commonSelectors.getLoadingStatus(state));
    const isLoaded = useSelector(state => commonSelectors.getLoadedStatus(state));
    React.useEffect(() => {
        dispatch(fetchVocabularyTest());
    }, [])
    
    const onUserAnswer = (answer) => {
        dispatch(addAnswer(answer));
        dispatch(nextTask());
    }


    
    const currentTaskWord = useSelector((state) => vocabularyTestSelectors.getCurrentTaskWord(state));
    const vocabularyTestWords = useSelector((state) => vocabularyTestSelectors.getKnowledgeTest(state));
    const answers = useSelector(state => state.educationPlans.answers);
    const isLastTask = useSelector(state => vocabularyTestSelectors.isLastTask(state))

    if(isLoading) return <h1>DOWNLOADING</h1>
    return (
        <div>
            <Header />
            <div className = {styles['task-container']}>
                <div className = {styles['question-container']}>
                    {!isLastTask && <p className = {styles['question']}>{translatableText('doYouKnowThisWord')}</p>}
                    <p className = {styles['question-word']}>
                        {currentTaskWord}
                    </p>
                </div>
                {
                    isLastTask 
                                ?
                                <Redirect to = {'knowledgetests/results'} />
                                :
                                <div className = {styles['answer-button-container']}>
                                    <button className = {styles['answer-button']} onClick = {() => onUserAnswer(true)}>
                                        <img src = {yes} alt=""/>
                                    </button>
                                    <button className = {styles['answer-button']} onClick = {() => onUserAnswer(false)}>
                                        <img src = {no} alt=""/>
                                    </button>
                                </div>
                }

                <div>
                    <ProgressSchale  tasksAmount = {vocabularyTestWords} answerArray = {answers}/>
                </div>
            </div>
            
        </div>
    )
}