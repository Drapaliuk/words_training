import React from 'react';
import styles from '../styles.module.css';
import classNames from 'classnames';
import check from '../../../../../assets/img/check.png';
import bookmark from '../../../../../assets/img/bookmark.png';


export function ListItem(props) {

    const {wordObject, isSelected, onSelectingWord, onUnSelectingWord, onAddWordToUserVocabulary, userId} = props;

    return (
        <div className = {styles['word-block']}>
            <div className = {styles['word-wrapper']} >
                {
                    isSelected && <img onClick = {() => onSelectingWord(wordObject._id)} 
                                    className = {styles['check-img']} 
                                    src = {check} alt="asdas"/>
                }
                <button
                        className = {classNames({
                            [styles.word]: true,
                            [styles.selected]: isSelected,
                        })}
                        onClick = {isSelected ? onUnSelectingWord(wordObject._id) : onSelectingWord(wordObject)} //!
                        >{wordObject.ukr}
                </button>
            </div>
            <button
                className = {styles['vocabulary-add-button']}
                onClick = {onAddWordToUserVocabulary(wordObject._id, userId)}
            >
                    <img src = {bookmark} alt="bookmark"/>
            </button>
        </div>
    )

}