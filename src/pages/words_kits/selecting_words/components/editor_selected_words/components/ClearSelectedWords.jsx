import React from 'react';
import styles from '../styles.module.css';
import trash from '../../../../../../assets/img/trash.png';

export function ClearSelectedWords({onClearSelectedWords}) {
    return (
        <button className = {styles['edit-selected-words-button']} 
                onClick = {onClearSelectedWords}>
                <img src = {trash} alt=""/>
        </button>
    )
}