import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { Header } from '../../../components'
import { fetchVocabularyLevel, clearKnowledgeTestsData } from '../../../redux/actions';
import { vocabularyTestSelectors } from '../../../redux/selectors';
import styles from './styles.module.css';
export function KnowledgeTestResultsPage() {
    const dispatch = useDispatch();
    const knowledgeTestResult = useSelector(state => vocabularyTestSelectors.getModifiedTestAnswers(state));
    const {vocabulary, level} = useSelector(state => vocabularyTestSelectors.getResults(state));

    const [isVisibleLevelDescribe, setVisibleLevelDescribe] = React.useState(false)


    React.useEffect(() => {
        dispatch(fetchVocabularyLevel(knowledgeTestResult));
        dispatch(clearKnowledgeTestsData())
    }, []);


    return (
        <div>
            <Header />
            <div className = {styles['content-container']}>
                <div className = {styles['result']}>
                    Ваш словниковий запас складає приблизно {vocabulary} - рівень {level}
                </div>
                <div className = {styles['level-describe-container']}>
                    <button onClick = {() => setVisibleLevelDescribe(!isVisibleLevelDescribe)} className = {styles['level-describe-button']}>детальніше про рівень</button>
                    {
                        isVisibleLevelDescribe
                        &&
                    <div className = {styles['level-describe']}>
                        {'akdasndojasnojadsjoascasicasdihcadshicsidhcasicbasihacihsbcds'}
                    </div>
                    }
                    
                </div>
                <NavLink className = {styles['repeat-test']} onClick = {() => dispatch(clearKnowledgeTestsData())} to = {'/vocabularyTest'}>Повторити тест</NavLink>
            </div>
        </div>
    )
}

