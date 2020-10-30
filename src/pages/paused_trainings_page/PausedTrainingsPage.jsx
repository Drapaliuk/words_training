import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPausedTrainings } from '../../redux/actions/trainings/paused_training/paused_training_actions';
import { authorizationSelectors } from '../../redux/selectors';
import { getPausedTrainingsList } from '../../redux/selectors/trainings/training_pause_selectors';

export function PausedTrainingsPage() {
    const dispatch = useDispatch();
    
    const userId = useSelector(state => authorizationSelectors.getUserId(state));
    const pausedTrainingsList = useSelector(state => getPausedTrainingsList(state));
    console.log('pausedTrainingsList', pausedTrainingsList)
    
    React.useEffect(() => {
        dispatch(fetchPausedTrainings(userId))
    }, [])

    if(!pausedTrainingsList) {
        return 'Hello world'
    }

    return (
        <div>
            {
                pausedTrainingsList.map(el => {
                return <li>{el.timestamp}</li>
                })
            }
        </div>
    )
}

