import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { commonDataSelectors, trainingResultsSelectors } from '../../redux/selectors/index';
import {fetchingTrainingResults} from '../../redux/actions/training_results_actions';
import {ResultItem} from './components/result_item/ResultItem';
import {Header} from '../../components/index';


import styles from './ResultPage.module.css'


export const ResultPage = function(props) {
        const dispatch = useDispatch();
        const trainingStatistics = useSelector(state => commonDataSelectors.getTrainingStatistics(state))
        const trainingResults = useSelector(state => trainingResultsSelectors.getTrainingResults(state))
        
        React.useEffect(() => {
            dispatch(fetchingTrainingResults(trainingStatistics))
        }, [])

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