import React from 'react';
import styles from './ProgressScale.module.css';
import classNames from 'classnames';

function ProgressScale({tasksAmount, answerArray}) {
    return (
        <div className = {styles['schale']}>
            {
                tasksAmount.map((el, idx) => {
                    if(answerArray[idx]) {
                        const isTrueAnswer = answerArray[idx].answer

                        if(isTrueAnswer)
                        return <button className = {classNames(styles['progress-item'], {
                            [styles['status-success']]: true
                        })}></button>

                        if(!isTrueAnswer)
                        return <button className = {classNames(styles['progress-item'], {
                            [styles['status-mistake']]: true
                        })}></button>
                    }
                    
                    return <button className = { classNames(styles['progress-item']) }></button>
                })
            }
        </div>
    )
}

export default ProgressScale
