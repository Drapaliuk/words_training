import React from 'react'
import classNames from 'classnames';
import styles from './MistakesDetails.module.css';


export const MistakesDetails = function (props) {
    const {correctVariant} = props;
    console.log(props.answerDetails)
    if(props.trainingId === '001') {
        return (
            <ul className = {styles['mistake-details-list']}>
                {props.answerDetails.map(el => {
                    return (
                            <li className = {classNames({
                                [styles['main-styles']]: true,
                                [styles['mistake-letter']]: el[el.questionLang] !== correctVariant[correctVariant.questionLang],
                                [styles['true-letter']]: el[el.questionLang] === correctVariant[correctVariant.questionLang]
                            })}>
                                {
                                    el[correctVariant.answerLang]
                                }
                                {
                                    el[el.questionLang] !== correctVariant[correctVariant.questionLang] 
                                        ? <span className = {styles['arrow-down']}>&#8659;</span> 
                                        : null
                                }
                            </li>
                        )
                })}
            </ul>
        )
    }

    if(props.trainingId === '002') {
        const choosenVariants = props.answerDetails.map(el => {
            const correctLetter = el.correctVariant
            const spanArr = el.choosenVariants.map(letter => {
                return(
                    <span>
                        <span className = {classNames({
                            [styles['main-styles']]: true,
                            [styles['mistake-letter']]: letter !== correctLetter,
                            [styles['true-letter']]: letter === correctLetter
                        })}>{letter}</span>
                        {letter !== correctLetter ? <span> &#8658; </span> : null}
                    </span>
                    
                )
            })

            return(
                <div className = {styles['one-letter-block']}>
                    {spanArr}
                </div>
            )
        })

         return choosenVariants
    }
}