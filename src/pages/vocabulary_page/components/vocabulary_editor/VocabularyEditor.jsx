import React from 'react';
import classNames from 'classnames';
import { selectingWord } from '../../../../redux/actions/common_data_actions';
import { userContentStoreSelectors } from '../../../../redux/selectors/index';
import styles from './VocabularyEditor.module.css';
import { deleteWordFromVocabulary, selectingWordsFromUserVocabulary, unSelectingWordsFromUserVocabulary } from '../../../../redux/actions/user_content_store/user_vocabulary_actions';
import { useSelector, useDispatch } from 'react-redux';
import check from '../../../../assets/img/check.png'


export const VocabularyEditor = function({words, showWordSetCreator}) { 
    const dispatch = useDispatch()

    let onSelectingForTraining = (word) => {
        return () => {
            dispatch(selectingWordsFromUserVocabulary(word))
        }
    }

    let onUnSelectingForTraining = (id) => {
        return () => {
            dispatch(unSelectingWordsFromUserVocabulary(id))
        }
    }

    const selectedWords = useSelector((state) => {
        return userContentStoreSelectors.getSelectedWords(state)
    })


    const deleteWord = (el) => {
        return () => {
            dispatch(deleteWordFromVocabulary(el))
            dispatch(unSelectingWordsFromUserVocabulary(el._id))
        }
    }
    
    let setList = words.map(el => { // перенест в окремий компонент  і зробити це локальним стейтом
        const isChecked = selectedWords.find(word => word._id === el._id)
        return (
            <div className = {styles['word-block']}>
                <div className = {styles['word-wrapper']} >
                    {
                        isChecked ? 
                                        <img onClick = {isChecked ? onUnSelectingForTraining(el._id) : onSelectingForTraining(el) }
                                            className = {styles['check-img']} 
                                            src = {check} 
                                            alt=""
                                        /> 
                         : null
                                    
                    }

                    {
                        showWordSetCreator && !isChecked ? 
                                            <div className = {styles['circle']}
                                                onClick = {isChecked ? onUnSelectingForTraining(el._id) : onSelectingForTraining(el) }
                                             ></div>
                                           :
                                           null
                    }

                    <button
                        className = {classNames({
                            [styles.selected]: isChecked,
                            [styles.word]: true
                        })}
                        onClick = {isChecked ? onUnSelectingForTraining(el._id) : onSelectingForTraining(el) }
                        >{el.ua}
                    </button>
                </div>
                <button
                    className = {styles['vocabulary-add-button']}
                    onClick = {deleteWord(el)}
                >
                        X
                </button>
            </div>
            
        )
    })
   
    return(
        <div className = {styles['words-list']}>
            {setList}
        </div>
            
    )
}