import React from 'react';
import styles from './ResultItem.module.css';
import classNames from 'classnames';
import {MistakesDetails} from '../mistake_details/MistakesDetails';
import ReviewTask from '../review_task/ReviewTask';
import { translatableText } from '../../../../../languages/instances/training';



export function ResultItem(props) {
    const [isOpenFullInfo, setOpenStatusFullInfo] = React.useState(false);
    const [isOpenTargetsMistakes, setOpenStatusTargetsMistakes] = React.useState(false);
    const [isOpenReviewTask, setOpenStatusReviewTask] = React.useState(false);
    console.log('item', props)
    return (
        <div>
            <div onClick = {() => setOpenStatusFullInfo(!isOpenFullInfo)}
                 className = {classNames(styles['main-info'], {
                     [styles['true-answer']]: !props.isMistakeInTheTask && !props.isSkipped,
                     [styles['was-mistake']]: props.isMistakeInTheTask,
                     [styles['was-skipped']]: props.isSkipped && !props.isMistakeInTheTask
                 })}>
                <p className = {styles['word']}>{ props.word[props.word.questionLang]}</p>
            </div>
            {
                isOpenFullInfo 
                    ? <div className = {styles['full-info']}>
                        <p>{translatableText('time')}: {props.timestamps.amount / 1000} сек.</p>
                        {
                                    props.isMistakeInTheTask && props.amountMistakes !== (-1) && !props.isSkipped 
                                        ? <div>
                                                <p>Було допущено помилок {props.amountMistakes}</p>
                                                <button className = {styles['mistake-details-button']} 
                                                        onClick = {() => setOpenStatusTargetsMistakes(!isOpenTargetsMistakes)}
                                                        >
                                                            {translatableText('details')}
                                                </button>
                                            {
                                                isOpenTargetsMistakes ? 
                                                    <MistakesDetails trainingId = {props.trainingId} 
                                                                     answerDetails = {props.answerDetails}
                                                                     correctVariant = {props.word}
                                                                     /> 
                                                    : null
                                            }
                                          </div> 
                                        : null
                        }
                            <button className = {styles['task-review-button']}
                                    onClick = {() => setOpenStatusReviewTask(!isOpenReviewTask)}        
                            >
                                {translatableText('task')}
                            </button>
                            {isOpenReviewTask 
                                ? 
                                <ReviewTask trueWord = {props.word} 
                                            task = {props.task} 
                                            trainingId = {props.trainingId} />
                                :
                                null}
                        
                            {!props.isMistakeInTheTask && !props.isSkipped ? <p>{translatableText('perfect')}</p> : null}
                            {props.isSkipped ? <p>{translatableText('taskWasSkipped')}</p> : null}
                            {props.needHint && !props.isSkipped  ? <p>{translatableText('taskWithHint')}</p> : null}
                        
                      </div>
                    : null
            }
        </div>
    )
}