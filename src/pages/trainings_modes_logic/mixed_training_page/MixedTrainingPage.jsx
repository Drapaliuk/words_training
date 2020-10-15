import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SpellingPage, TestWordPage } from '../../index';
import { mixedTrainingSelectors } from '../../../redux/selectors/mixed_training_selectors';
import { commonDataSelectors } from '../../../redux/selectors/common_data_selectors';
import { createEducationPlan } from '../../../redux/actions/common_data_actions';
import { fetchingWordsForMixing } from '../../../redux/actions/word_test_actions';


export function MixedTestPage(props) {
    const dispatch = useDispatch();
    const selectedWords = useSelector(state => commonDataSelectors.getSelectedWords(state));
    const isLoaded = useSelector(state => commonDataSelectors.isLoaded(state));

    React.useEffect(() => { //?!
        if(!isLoaded) {
            console.log('fetch from mixed')
            dispatch(createEducationPlan(selectedWords))
        }
    }, []);

    React.useEffect(() => {
        dispatch(fetchingWordsForMixing())
    }, [])
    
    const trainingId = useSelector(state =>  commonDataSelectors.getScheduleTaskTrainingId(state));

    if(!isLoaded) return 'hello world';
    
    switch(trainingId) {
        case '001':
            return <TestWordPage />
        case '002':
            return <SpellingPage />
        default:
            return 'Fuck!'
    };
};