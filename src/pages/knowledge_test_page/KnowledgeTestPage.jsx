import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vocabularyTestSelectors } from '../../redux/selectors/index';
import { addAnswer, nextTask, fetchingKnowledgeTest } from '../../redux/actions/knowledge_tests/knowledge_tests_actions';
import styles from './KnowledgeTest.module.css';
import {Header} from '../../components/index';
import ProgressSchale from './components/progress_schale/ProgressScale';
import yes from '../../assets/img/yes.png';
import no from '../../assets/img/no.png';
import { NavLink, Redirect } from 'react-router-dom';
 
export function KnowledgeTestPage() {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(fetchingKnowledgeTest())
    }, [])

    const onUserAnswer = (answer) => {
        dispatch(addAnswer(answer))
        dispatch(nextTask())
    }


    const onFinish = function() {
       
    }
    
    const currentTaskWord = useSelector((state) => vocabularyTestSelectors.getCurrentTaskWord(state));
    const vocabularyTestWords = useSelector((state) => vocabularyTestSelectors.getKnowledgeTest(state));
    const answers = useSelector(state => state.educationPlans.answers);
    const isLastTask = useSelector(state => vocabularyTestSelectors.isLastTask(state))




    return (
        
        <div>
            <Header />
            <div className = {styles['task-container']}>
                <div className = {styles['question-container']}>
                    {!isLastTask && <p className = {styles['question']}>Ви знаєте це слово?</p>}
                    <p className = {styles['question-word']}>
                        {currentTaskWord}
                    </p>
                </div>
                {
                    isLastTask 
                                ?
                                onFinish()
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