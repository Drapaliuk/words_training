import React from 'react';
import { useDispatch } from 'react-redux';
import { openExitWindow } from '../../../../../../redux/actions/trainings/paused_training/paused_training_actions';
import styles from './styles.module.css';

export function ExitFromTrainingButton() {
    const dispatch = useDispatch();
    const onOpenExitWindow = () => {
        dispatch(openExitWindow())
    };
    
    return (
        <button className = {styles['exit-button']} 
                onClick = {onOpenExitWindow}
        >
            Вийти
        </button>

    )
}