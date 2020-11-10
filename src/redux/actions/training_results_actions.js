import { FETCHING_TRAINING_RESULTS } from '../action_types/index';
import { trainingResultsAPI } from '../../DAL/api';

export const fetchingTrainingResults = traininingStatistics => dispatch => {
    trainingResultsAPI.postTrainingStatistics(traininingStatistics)
                      .then(resp => {
                          console.log('RESPONSE', resp)
                          dispatch({type: FETCHING_TRAINING_RESULTS, serverPayload: resp.data})
                      })
};