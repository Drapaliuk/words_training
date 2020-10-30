import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../../components';
import { fetchPausedTrainings } from '../../redux/actions/trainings/paused_training/paused_training_actions';
import { authorizationSelectors } from '../../redux/selectors';
import { getPausedTrainingsList } from '../../redux/selectors/trainings/training_pause_selectors';
import { dataTransformer } from '../../utils/index';


export function PausedTrainingsPage() {
    const dispatch = useDispatch();
    
    const userId = useSelector(state => authorizationSelectors.getUserId(state));
    const pausedTrainingsList = useSelector(state => getPausedTrainingsList(state));
    console.log('userId', userId)
    
    React.useEffect(() => {
        dispatch(fetchPausedTrainings(userId))
    }, [pausedTrainingsList])

    if(!pausedTrainingsList) {
        return <Header />
    }

    return (
        <div>
            <Header />
            {
                pausedTrainingsList.map(el => {
                    const transformedDate = dataTransformer(el.data.serviceInfo.timestamp)
                    return <li>{`${transformedDate.year}.${transformedDate.month}.${transformedDate.date}`}</li>
                })
            }
        </div>
    )
}

