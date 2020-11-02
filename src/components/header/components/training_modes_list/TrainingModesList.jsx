import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { selectingTrainingMode } from '../../../../redux/actions/common_data_actions';
import { useDispatch, useSelector } from 'react-redux';
import { commonDataSelectors } from '../../../../redux/selectors';

export const TrainingModesList = function ({ onVisibleComponent }) {
    const dispatch = useDispatch();
    const trainingIds = useSelector(state => commonDataSelectors.getTrainingModesInfo(state));

    const onSelectingTrainingMode = function(selectedTrainingModeId) {
        dispatch(selectingTrainingMode(selectedTrainingModeId))
    };

   
//! ua
    return (
            <ul className = {styles['list']} onClick = { onVisibleComponent('TrainingModesList') }>
                {
                    trainingIds.map( mode => {
                        return (
                            <li key = {mode.id} className = {styles['list-item']}>
                               <NavLink className = {styles['link']}
                                        onClick = {() => onSelectingTrainingMode(mode.id)} 
                                        to = {'/selectWordSet'}
                                > 
                                    {mode.names.ua} 
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
    )
}