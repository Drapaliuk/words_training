import React from 'react';
import styles from './ProgressScale.module.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { commonDataSelectors } from '../../redux/selectors/training/common/common_data_selectors';
import { reviewPreviousTasks } from '../../redux/actions/training/common/common_training_actions';


export const ProgressScale = function() {
    const dispatch = useDispatch()
    const tasksAmount = useSelector(state => commonDataSelectors.getScheduleTaskCard(state));
    const answerArray = useSelector(state => commonDataSelectors.getTrainingStatistics(state));

    const onReviewPreviousTask = (taskNumber) => () => dispatch(reviewPreviousTasks(taskNumber)) //реалізувати в майбутньому

    return (
        <div className = {styles['schale']}>
            {
                tasksAmount.map((el, idx) => {
                    if(answerArray[idx]) {
                        const isMistakeInTheTask = answerArray[idx].isMistakeInTheTask;
                        const isSkippedTask = answerArray[idx].isSkipped;
                        const isHinted = answerArray[idx].needHint


                        if(isHinted && !isSkippedTask) {
                            return <button className = {classNames(styles['progress-item'], {
                                [styles['status-skipped']]: true
                            })}></button>
                        }

                        if(!isMistakeInTheTask && !isSkippedTask) {
                            return <button className = {classNames(styles['progress-item'], {
                                [styles['status-success']]: true
                            })}></button>
                        }
                        if(isMistakeInTheTask && !isSkippedTask || isSkippedTask) {
                            return <button className = {classNames(styles['progress-item'], {
                                [styles['status-mistake']]: true
                            })}></button>
                        }
                    }

                    return <button className = {classNames(styles['progress-item'])}></button>
                })
            }
        </div>
    )
}