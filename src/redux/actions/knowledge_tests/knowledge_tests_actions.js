import {knowledgeTestsAPI} from '../../../API/knowledge_tests/knowledge_tests_api';
import { FETCHING_KNOWLEDGE_TEST, ADD_ANSWER_VOCABULARY_TEST, NEXT_VOCABULARY_TEST_TASK } from '../../action_types/index';

export const nextTask = () => ({type: NEXT_VOCABULARY_TEST_TASK});
export const addAnswer = answer => ({type: ADD_ANSWER_VOCABULARY_TEST, answer});

export const fetchingKnowledgeTest = () => dispatch => {
    knowledgeTestsAPI.getVocabularyTest()
                     .then(resp => dispatch({type: FETCHING_KNOWLEDGE_TEST, payload: resp.data}))
};