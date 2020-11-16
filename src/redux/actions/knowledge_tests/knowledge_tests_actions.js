import {knowledgeTestsAPI} from '../../../API/knowledge_tests/knowledge_tests_api';
import { localStorageManipulator } from '../../../utils';
import { FETCHING_KNOWLEDGE_TEST, ADD_ANSWER_VOCABULARY_TEST, NEXT_VOCABULARY_TEST_TASK, TEST_RESULT } from '../../action_types/index';
import { loaded, loading } from '../index';

export const nextTask = () => ({type: NEXT_VOCABULARY_TEST_TASK});
export const addAnswer = answer => ({type: ADD_ANSWER_VOCABULARY_TEST, answer});

export const fetchVocabularyTest = () => dispatch => {
    dispatch(loading())
    knowledgeTestsAPI.getVocabularyTest()
                     .then(resp => {
                         dispatch({type: FETCHING_KNOWLEDGE_TEST, payload: resp.data});
                         dispatch(loaded())
                    })
};

export const fetchVocabularyLevel = results => dispatch => {
    const authToken = localStorageManipulator.getAuthToken();
    dispatch(loading())
    knowledgeTestsAPI.fetchVocabularyLevel(results, authToken)
                     .then(resp => {
                        dispatch({type: TEST_RESULT, serverPayload: resp.data});
                        dispatch(loaded())
                    })
}