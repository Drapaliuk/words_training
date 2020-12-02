import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { continuePausedTraining, fetchPausedTrainings } from '../../../../../redux/actions/training/pause/paused_training_actions';
import { authorizationSelectors, commonDataSelectors } from '../../../../../redux/selectors';
import { getPausedTrainingsList } from '../../../../../redux/selectors/training/pause/training_pause_selectors';
import { dataTransformer } from '../../../../../utils';
import styles from './styles.module.css'


export function PausedTrainingsList() {
    const dispatch = useDispatch();
    const userId = useSelector(state => authorizationSelectors.getUserId(state));
    const pausedTrainingsList = useSelector(state => getPausedTrainingsList(state));
    const allTrainingsIds = useSelector(state => commonDataSelectors.getTrainingModesInfo(state))
    

    React.useEffect(() => {
        dispatch(fetchPausedTrainings(userId))
    }, [])



    const onContinueTraining = (pausedTrainingId) => () => dispatch(continuePausedTraining(userId, pausedTrainingId))
    
    return (
        <div>
            {
                pausedTrainingsList.map(el => {
                    const transformedDate = dataTransformer(el.serviceInfo.timestamp)
                    const timestamp = `${transformedDate.year}.${transformedDate.month}.${transformedDate.date} -- ${transformedDate.hours}: ${transformedDate.minutes}`

                    const { url } = allTrainingsIds.find((trainingMode) => trainingMode.id === el.serviceInfo.selectedTrainingModeId)
                    console.log(url)
                    return <NavLink className = {styles['link']} 
                                    onClick = {onContinueTraining(el._id)} 
                                    to = {url}>
                                {timestamp}
                           </NavLink>
                })
            }
        </div>
    )
}
