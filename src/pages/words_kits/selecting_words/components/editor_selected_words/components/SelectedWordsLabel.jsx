import React from 'react';
import edit from '../../../../../../assets/img/edit.png';
import styles from '../styles.module.css';

export function SelectedWordsLabel({setVisibleSelectedWordsList, selectedWordsAmount, isVisibleSelectedWordsList}) {
    return (
        <button 
                className = {styles['edit-selected-words-button']}
                onClick = {() => setVisibleSelectedWordsList(!isVisibleSelectedWordsList)}
        >

        <img src = {edit} alt=""/>
        { selectedWordsAmount }
        
        </button>
    )
}
