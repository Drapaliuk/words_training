import React from 'react';
import { useState } from 'react';
import styles from './component.module.css';
import classNames from 'classnames';


export function VariantListItem({isDisabled, text, onClick, value, isTrueAnswer }) { // як робити пропси за замовчуванням? 
    const [mistakeAnswer, setMistakeAnswer] = useState(false);

    const onSelect = function() {
        setMistakeAnswer(isTrueAnswer ? false : true)
        onClick()
    }
    
    return (
        <li className = {styles.variantItems}>
            <button 
                    disabled = {isDisabled} 
                    onClick = {onSelect} 
                    value = {value} 
                    className = { isTrueAnswer ? styles.trueAnswer : styles.variantButton }
                    // className = {classNames(styles.variantButton, {
                    //         [styles.trueAnswer]: isTrueAnswer,
                    //         [styles.mistakeAnswer]: mistakeAnswer
                    // })}
                >
                    {text}
            </button>
        </li>
    )
}