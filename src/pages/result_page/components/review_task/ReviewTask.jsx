import React from 'react';
import styles from './ReviewTask.module.css';

function ReviewTask({task, trueWord, trainingId}) {
    if(trainingId === '001') {
        return (
            <div className = {styles['review-task']}>
                <div className = {styles['task-question-word']}>
                    {trueWord[trueWord.questionLang]}
                </div>
                <ul className = {styles['task-list']}>
                    {
                        task.map(word => {
                            return <li className = {styles['task-list-item']}
                                       onBlur = {() => {console.log(1)}} 
                                        >
                                        {word[trueWord.answerLang]}, ({word[trueWord.questionLang]})
                                   </li>
                        })
                    }
                </ul>
            </div>
        )
    }

    if(trainingId === '002') {
        return (
            <div className = {styles['review-task']}>
                <div className = {styles['task-question-word']}>
                    {trueWord[trueWord.questionLang]}
                </div>
                <ul className = {styles['task-list']}>
                    {
                        task.map(letter => {
                         
                            return <span className = {styles['letter']}>
                                        {letter}
                                   </span>
                                       
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default ReviewTask
