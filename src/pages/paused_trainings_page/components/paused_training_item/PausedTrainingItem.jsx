import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../../../components';
import { continuePausedTraining, fetchPausedTrainings } from '../../../../redux/actions/training/pause/paused_training_actions';
import { authorizationSelectors, commonDataSelectors } from '../../../../redux/selectors';
import { getPausedTrainingsList } from '../../../../redux/selectors/training/pause/training_pause_selectors';
import styles from './styles.module.css'


export function PausedTrainingItem() {
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
    
    return (
        <div>
            <Header />
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