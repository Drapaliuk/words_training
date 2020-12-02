import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { closeCommentField, makePausedTraining, openCommentField, writeComment } from '../../../../../redux/actions/training/pause/paused_training_actions';

import { authorizationSelectors } from '../../../../../redux/selectors';
import { getInfoForPause, getPausedTrainingComment, pausedTrainingSelectors } from '../../../../../redux/selectors/training/pause/training_pause_selectors';

import styles from './styles.module.css';
import classNames from 'classnames';

import { translatableText } from '../../../../../languages/instances/training';




export  function PauseTrainingButton() {
    const dispatch = useDispatch();
    
    const comment = useSelector(state => getPausedTrainingComment(state));
    const userId = useSelector(state =>  authorizationSelectors.getUserId(state));
    const pausedTrainingData = useSelector(state => getInfoForPause(state));
    const isOpenCommentField = useSelector(state => pausedTrainingSelectors.isOpenCommentField(state));


    const onPausedTraining = (userId, pausedTrainingData) => () => {
        dispatch(makePausedTraining ( userId, pausedTrainingData ))
    } 


    const onOpenStatusCommentField = () => {
        if(isOpenCommentField) return dispatch(closeCommentField())
        dispatch(openCommentField())
    }

    const onWriteComment = (event) => dispatch(writeComment(event.target.value));

    return (
        <div className = {styles['common-wrapper']}>
            <button onClick = {onOpenStatusCommentField} 
                    className = {classNames(styles['open-button'], {[styles['open-button-active']]: isOpenCommentField})}
            >
                {
                    translatableText('finishLater')
                }
            </button>
            {
                isOpenCommentField
                    ?
                <div className = {'comment-wrapper'}>
                    <input type="text" 
                           onChange = {onWriteComment} 
                           value = {comment} 
                           placeholder = {translatableText('comment')}
                           className = {styles['comment-field']}
                    />
                    <NavLink to = '/intro' 
                             onClick = {onPausedTraining(userId, pausedTrainingData)}
                             className = {styles['link']}
                             >
                                 ok
                    </NavLink>
                </div>
                    :
                null
            }
        </div>
    )
}