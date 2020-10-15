import React from 'react';
import styles from './ButtonForLetter.module.css'

const ButtonForLetter = function(props) {
    return (
        <button 
            className = {props.needHint ? styles.hintStyle : styles.style} 
            onClick = {props.onClickHandler} 
            value = {props.letter}
                >
                    {props.letter}
                </button>
    )
}

export default ButtonForLetter;