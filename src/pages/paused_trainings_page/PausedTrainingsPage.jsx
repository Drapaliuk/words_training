import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { Header } from '../../components';
import { continuePausedTraining, deletePausedTraining, fetchPausedTrainings } from '../../redux/actions/trainings/paused_training/paused_training_actions';
import { authorizationSelectors, commonDataSelectors } from '../../redux/selectors';
import { getPausedTrainingsList, pausedTrainingSelectors } from '../../redux/selectors/trainings/training_pause_selectors';
import { dataTransformer } from '../../utils/index';
// import { PausedTrainingsList } from './components/index/'

import styles from './styles.module.css'

export function PausedTrainingsPage() {
    const dispatch = useDispatch();
    const userId = useSelector(state => authorizationSelectors.getUserId(state));
    const pausedTrainingsList = useSelector(state => getPausedTrainingsList(state));
    const allTrainingsIds = useSelector(state => commonDataSelectors.getTrainingModesInfo(state))

    React.useEffect(() => {
        dispatch(fetchPausedTrainings(userId))
    }, [])

    if(!pausedTrainingsList) {
        return <Header />
    }
    
    const onContinueTraining = (pausedTrainingId) => () => dispatch(continuePausedTraining(userId, pausedTrainingId))
    
    const onDeletePausedTraining = (pausedTrainingId) => () => dispatch(deletePausedTraining(userId, pausedTrainingId))

    return (
        <div>
            <Header />
            {
                pausedTrainingsList.map((el, idx) => {
                    const transformedDate = dataTransformer(el.serviceInfo.timestamp)
                    const timestamp = `${transformedDate.year}.${transformedDate.month}.${transformedDate.date} -- ${transformedDate.hours}: ${transformedDate.minutes}`
                    const comment = el.serviceInfo.comment
                    const { url } = allTrainingsIds.find((trainingMode) => trainingMode.id === el.serviceInfo.selectedTrainingModeId)
                    console.log('comment', el.serviceInfo)
                    
                    const linkText = comment ? comment : timestamp
                    
                    
                    return <div className = {styles['item']}>
                                <NavLink className = {styles['link']} 
                                    onClick = {onContinueTraining(el._id)} 
                                    to = {url}>
                                        
                                        {linkText}
                                
                                </NavLink>
                                <button onClick = {onDeletePausedTraining(el._id)} className = {styles['delete-button']}>X</button>
                           </div>
                })
            }
        </div>
    )
}

