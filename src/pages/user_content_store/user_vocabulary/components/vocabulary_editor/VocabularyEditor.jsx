import React from 'react';
import classNames from 'classnames';
import { userContentStoreSelectors } from '../../../../../redux/selectors/index';
import styles from './VocabularyEditor.module.css';
import { deleteWordFromVocabulary, selectingWordsFromUserVocabulary, unSelectingWordsFromUserVocabulary } from '../../../../../redux/actions/user_content_store/user_vocabulary/user_vocabulary_actions';
import { useSelector, useDispatch } from 'react-redux';
import { authorizationSelectors } from '../../../../../redux/selectors/authorization/authorization_selectors';
import check from '../../../../../assets/img/check.png';



export const VocabularyEditor = function({words, showWordSetCreator}) { 
    const dispatch = useDispatch();
    const userId = useSelector(state => authorizationSelectors.getUserId(state))

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


    const deleteWord = (el) => () => {
            dispatch(deleteWordFromVocabulary(el._id, userId))
            dispatch(unSelectingWordsFromUserVocabulary(el._id))
    }
    
    let setList = words.map(el => {
        const isChecked = selectedWords.find(word => word._id === el._id)
        return (
            <div key = {el._id} className = {styles['word-block']}>
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
                        >{el.ukr}
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