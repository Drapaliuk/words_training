import React from 'react';
import { useDispatch } from 'react-redux';
import { openExitWindow } from '../../../../../../redux/actions/training/pause/paused_training_actions';
import styles from './styles.module.css';
// import { translatableText } from '../../../../trainings_modes_logic/translatable_text';
import { translatableText } from '../../../../../../languages/instances/training';




export function ExitFromTrainingButton() {
    const dispatch = useDispatch();
    const onOpenExitWindow = () => {
        dispatch(openExitWindow())
    };
    
    return (
        <button className = {styles['exit-button']} 
                onClick = {onOpenExitWindow}
        >
            {translatableText('exit')}
        </button>

    )
}