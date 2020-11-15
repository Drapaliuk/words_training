import React from 'react';
import classNames from 'classnames';
import { selectingAllWords } from '../../redux/actions/training/common/common_training_actions';
import { commonDataSelectors } from '../../redux/selectors/index';
import styles from './WordSetPage.module.css';
import SelectedAllWords from './components/SelectedAllWords';
import { addWordToVocabulary } from '../../redux/actions/user_content_store/user_vocabulary/user_vocabulary_actions';
import { useSelector, useDispatch } from 'react-redux';
import bookmark from '../../assets/img/bookmark.png'
import check from '../../assets/img/check.png'


const WordSelector = function({words}) { 
    const dispatch = useDispatch()
    const [isSelectedAllWords, setSelectedAllWords] = React.useState(false)

    let onSelectingForTraining = (wordId) => {
        dispatch(selectingAllWords())
    }

    let onSelectedAllWords = () => {
        dispatch(selectingAllWords())
        setSelectedAllWords(true)
    }

    const selectedWords = useSelector((state) => {
        return commonDataSelectors.getSelectedWords(state)
    })
    
    let setList = words.map(el => {
        const isChecked = selectedWords.find(word => word._id === el._id)
        return (
            <div className = {styles['word-block']}>
                <div className = {styles['word-wrapper']} >
                    {isChecked ? <img onClick = {() => onSelectingForTraining(el._id)} className = {styles['check-img']} src = {check} alt=""/> : null}
                    <button
                            className = {classNames({
                                [styles.selected]: isChecked,
                                [styles.word]: true
                            })}
                            onClick = {() => onSelectingForTraining(el._id)}
                            value = {el._id}>
                                {el.ukr}
                    </button>
                </div>
                <button
                    className = {styles['vocabulary-add-button']}
                    onClick = {() => {dispatch(addWordToVocabulary(el)) }}
                >
                        <img src = {bookmark} alt="bookmark"/>
                </button>
            </div>
            
        )
    })
   
    return(
        <div className = {styles['words-list']}>
            {setList}
            {!isSelectedAllWords ? <button onClick = {onSelectedAllWords}>Обрати всі</button> : null}
            <div className = {styles['all-selected-words-wrapper']}>
                    <SelectedAllWords />
            </div>  
        </div>
            
    )
}