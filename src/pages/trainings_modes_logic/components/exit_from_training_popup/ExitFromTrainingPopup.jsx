import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exitFromTraining } from '../../../../redux/actions/common_data_actions';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';



import { commonDataSelectors } from '../../../../redux/selectors';

export function ExitFromTrainingPopup(props) {
    const dispatch = useDispatch()
    const restTask = useSelector(state => commonDataSelectors.getTaskRest(state));
    const currentTrainingModeId = useSelector(state => commonDataSelectors.getCurrentTrainingModeId(state));

    const onExitFromTraining = () => {
        dispatch(exitFromTraining(currentTrainingModeId))
    }

    const onContinueTraining = () => {
        props.onContinueTraining(false)
    }

    return (
        <div className = {styles['wrapper']}>
            <div className = {styles['asks-block']}>
                <div>Ви дійсно бажаєте закінчити тренування</div>
                {
                    restTask > 1
                    ?
                    <div>Залишилось {restTask} завдань</div>
                    :
                    <div>Це останнє завдання</div>

                }

            </div>
            
            <div className = {styles['answer-block']}>
                <NavLink to = 'intro' onClick = {onExitFromTraining}
                    className = {styles['exit-button']}
                >
                    Вийти з тренування
                </NavLink>
                <button onClick = {onContinueTraining} className = {styles['continue-training']}>Продовжити тренування</button>
            </div>
            
        </div>
    )
}