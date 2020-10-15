import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vocabularyTestSelectors } from '../../redux/selectors/index';
import { addAnswer, nextTask, fetchingKnowledgeTest } from '../../redux/actions/knowledge_test_actions';
import styles from './KnowledgeTest.module.css';
import {Header} from '../../components/index';
import ProgressSchale from './components/progress_schale/ProgressScale';
import yes from '../../assets/img/yes.png';
import no from '../../assets/img/no.png';
 
export function KnowledgeTestPage() {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(fetchingKnowledgeTest())
    }, [])

    const onUserAnswer = (answer) => {
        dispatch(addAnswer(answer))
        dispatch(nextTask())
    }
    
    const currentTaskWord = useSelector((state) => vocabularyTestSelectors.getCurrentTaskWord(state));
    const vocabularyTestWords = useSelector((state) => vocabularyTestSelectors.getKnowledgeTest(state));
    const answers = useSelector(state => state.educationPlans.answers);

    return (
        
        <div>
            <Header />
            <div className = {styles['task-container']}>
                <div className = {styles['question-container']}>
                    <p className = {styles['question']}>Ви знаєте це слово?</p>
                    <p className = {styles['question-word']}>
                        {currentTaskWord.eng}
                    </p>
                </div>
                <div className = {styles['answer-button-container']}>
                    <button className = {styles['answer-button']} onClick = {() => onUserAnswer(true)}>
                        <img src = {yes} alt=""/>
                    </button>
                    <button className = {styles['answer-button']} onClick = {() => onUserAnswer(false)}>
                        <img src = {no} alt=""/>
                    </button>
                </div>
                <div>
                    <ProgressSchale  tasksAmount = {vocabularyTestWords} answerArray = {answers}/>
                </div>
            </div>
            
        </div>
    )
}