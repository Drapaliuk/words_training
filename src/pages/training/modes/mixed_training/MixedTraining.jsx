import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SpellingTraining, WordTraining } from '../../../index';
import { commonDataSelectors } from '../../../../redux/selectors/training/common/common_data_selectors';
import { fetchingMixedTasks } from '../../../../redux/actions/training/modes/mixed_mode_actions';
import { selectingTrainingMode } from '../../../../redux/actions/training/common/common_training_actions';
import { getLanguagePair, getLanguagePairCodes, profileSelectors } from '../../../../redux/selectors';


export function MixedTraining(props) {
    const dispatch = useDispatch();
    const selectedWordsIds = useSelector(state => commonDataSelectors.getSelectedWordsIds(state))
    const isLoaded = useSelector(state => commonDataSelectors.isLoaded(state));
    const isLoadingPausedTraining = useSelector(state => commonDataSelectors.isLoadingPausedTraining(state));
    const selectedLanguage = useSelector(state => profileSelectors.getSelectedLanguage(state));
    const languagePairCodes = useSelector(state => getLanguagePairCodes(state));

    React.useEffect(() => {
        dispatch(selectingTrainingMode('003'))
    }, [])

    React.useEffect(() => {
        if(isLoadingPausedTraining) return
        if(!isLoaded) {
            dispatch(fetchingMixedTasks(selectedWordsIds, selectedLanguage, languagePairCodes))
        }
    })
    
    const trainingId = useSelector(state =>  commonDataSelectors.getScheduleTaskTrainingId(state));

    if(!isLoaded) return 'hello world';
    
    switch(trainingId) {
        case '001':
            return <WordTraining />
        case '002':
            return <SpellingTraining />
        default:
            return '!'
    };
};