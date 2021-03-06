import React from 'react';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchingWords } from '../../../redux/actions/training/common/common_training_actions';
import { commonDataSelectors, profileSelectors } from '../../../redux/selectors/index';
import { Header } from '../../../components/index';
import styles from './WordSetPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { LinkToTraining, WordSelector } from './components/index';
import { translatableText } from '../../../languages/instances/word_kit';
import { SelectLanguagePair } from '../../../components';

export const SelectingWords = function(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchingWords(props.match.params.setName)) //! перейменувати
    }, []) 
    
    const selectedTrainingMode = useSelector(state => commonDataSelectors.getSelectedTrainingModeId(state));
    const trainingModesInfo = useSelector(state => commonDataSelectors.getTrainingModesInfo(state));
    const selectedLanguage = useSelector(state => profileSelectors.getSelectedLanguage(state));

    if(!props.match.params.setName) {
        return (
            <Redirect path = {'/intro'} />
        )
    }

    return (
        <div>
            <Header />
            <div className = {styles['wordset-inner-container']}>
                <SelectLanguagePair />
                <div className = {styles['main-container']}>
                    <WordSelector />
                </div>
                <div className = {styles['main-container']}>
                    <div className = {styles['training-mode-list']}>

                    {
                        trainingModesInfo.map(el => {
                            if(selectedTrainingMode && el.id === selectedTrainingMode) {
                                return <LinkToTraining key = {el.id} url = {el.url} text = {translatableText('start')} />
                            }

                            if(!selectedTrainingMode) {
                                return <LinkToTraining key = {el.id} url = {el.url} text = {el.names[selectedLanguage]} />
                            }

                            return null
                        })
                    }
                        </div>
                </div>
                
            </div>
        </div>
            
            
    )
}