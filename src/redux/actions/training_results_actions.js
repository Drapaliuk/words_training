import { FETCHING_TRAINING_RESULTS } from '../action_types/index';
import { trainingResultsAPI } from '../../DAL/training/results/results_api';

export const fetchingTrainingResults = traininingStatistics => dispatch => {
    trainingResultsAPI.postTrainingStatistics(traininingStatistics)
                      .then(resp => {
                          dispatch({type: FETCHING_TRAINING_RESULTS, serverPayload: resp.data})
    })
};