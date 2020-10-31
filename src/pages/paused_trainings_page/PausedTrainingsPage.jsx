import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../../components';
import { continuePausedTraining, fetchPausedTrainings } from '../../redux/actions/trainings/paused_training/paused_training_actions';
import { authorizationSelectors } from '../../redux/selectors';
import { getPausedTrainingsList, pausedTrainingSelectors } from '../../redux/selectors/trainings/training_pause_selectors';
import { dataTransformer } from '../../utils/index';


export function PausedTrainingsPage() {
    const dispatch = useDispatch();
    
    const userId = useSelector(state => authorizationSelectors.getUserId(state));
    const pausedTrainingsList = useSelector(state => getPausedTrainingsList(state));
    // const selectedTrainingForСontinue = useSelector(state => pausedTrainingSelectors.getselectedTrainingForСontinue(state))
    React.useEffect(() => {
        dispatch(fetchPausedTrainings(userId))
    }, [])

    if(!pausedTrainingsList) {
        return <Header />
    }
    const onContinueTraining = (pausedTrainingId) => () => dispatch(continuePausedTraining(pausedTrainingId))
    
    return (
        <div>
            <Header />
            {
                pausedTrainingsList.map(el => {
                    const transformedDate = dataTransformer(el.data.serviceInfo.timestamp)
                    return <button onClick = {onContinueTraining(el._id)}>{`${transformedDate.year}.${transformedDate.month}.${transformedDate.date}`}</button>
                })
            }
        </div>
    )
}

