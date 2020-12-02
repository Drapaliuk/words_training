import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonDataSelectors, trainingResultsSelectors } from '../../../redux/selectors/index';
import {fetchingTrainingResults} from '../../../redux/actions/training/results/training_results_actions';
import {ResultItem} from './components/result_item/ResultItem';
import {Header} from '../../../components/index';
import styles from './ResultPage.module.css'


export const TrainingResults = function(props) {
        const dispatch = useDispatch();
        const trainingStatistics = useSelector(state => commonDataSelectors.getTrainingStatistics(state))
        const trainingResults = useSelector(state => trainingResultsSelectors.getTrainingResults(state))
        
        React.useEffect(() => {
            dispatch(fetchingTrainingResults(trainingStatistics))
        }, [])

        if(trainingResults.length === 0) {
            return 'zero'
        }


console.log('TRAINING RESULT', trainingResults)
        return (
            <div>
                <Header />
                <div className = {styles['container']}>
                        {trainingResults.map((el => {
                            return <ResultItem {...el} />
                        }))}
                </div>
            </div>
            
        )
}