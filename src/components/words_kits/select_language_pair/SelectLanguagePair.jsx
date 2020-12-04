import React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableLanguagesForTraining, getLanguagePair } from '../../../redux/selectors';
import { selectLanguagePair } from '../../../redux/actions/training/select_language_pair/select_language_pair_action';

export const SelectLanguagePair = function () {
    const dispatch = useDispatch();
    const availableLanguagesForTraining = useSelector(state => getAvailableLanguagesForTraining(state));
    const {firstLanguage, secondLanguage} = useSelector(state => getLanguagePair(state));



    const [isVisibleLanguagePair, setVisibleLanguagePair] = React.useState(false)
    const [isVisibleFirstLanguageVariants, setVisibleFirstLanguageVariants] = React.useState(false);
    const [isVisibleSecondLanguageVariants, setVisibleSecondLanguageVariants] = React.useState(false);


    const onVisibleFirstLanguageVariants = () => setVisibleFirstLanguageVariants(!isVisibleFirstLanguageVariants)
    const onVisibleSecondLanguageVariants = () => setVisibleSecondLanguageVariants(!isVisibleSecondLanguageVariants)
    const onVisibleLanguagePair = () => setVisibleLanguagePair(!isVisibleLanguagePair)
    const onSelectFirstLanguage = () => {
        setVisibleFirstLanguageVariants(!isVisibleFirstLanguageVariants)
    }

    const onSelectLanguage = (languageNumber, languageObject) => () =>{
        setVisibleSecondLanguageVariants(false);
        setVisibleFirstLanguageVariants(false);
        dispatch(selectLanguagePair({languageNumber, languageObject}));
        
    }

    return (
        <div className = {styles['select-language-pair']}>
           <button onClick = {onVisibleLanguagePair} className = {styles['select-language-pair__visible-btn']}>Мови для тренування</button>
           
           {
                isVisibleLanguagePair
                    &&
                <div className={styles["select-language-pair__variants-wrapper"]}>
                    <div className={styles["select-language-pair__language"]}>
                        <button onClick = {onVisibleFirstLanguageVariants} className = {styles['select-language-pair__selected-language']}>
                            {firstLanguage.fullName}
                        </button>
                        
                        {
                            isVisibleFirstLanguageVariants
                              &&
                            <div className={styles["select-language-pair__variants-list"]}>
                            {
                                availableLanguagesForTraining.map(language => {
                                    if(language.code === firstLanguage.code || language.code === secondLanguage.code) return 
                                    return <button className = {styles['select-language-pair__variant']}
                                                   onClick = {onSelectLanguage('firstLanguage', language)}
                                                >
                                                {language.fullName}
                                           </button>
                                })
                            }
                              
                            </div>
                        }
                        
                        
                    </div>
                    <div className={styles["select-language-pair__language"]}>
                        <button onClick = {onVisibleSecondLanguageVariants} className = {styles['select-language-pair__selected-language']}>
                            {secondLanguage.fullName}
                        </button>
                        
                        {
                            isVisibleSecondLanguageVariants
                                &&
                            <div className={styles["select-language-pair__variants-list "]}>
                               {
                                    availableLanguagesForTraining.map(language => {
                                        if(language.code === firstLanguage.code || language.code === secondLanguage.code) return 
                                        return <button className = {styles['select-language-pair__variant']}
                                                       onClick = {onSelectLanguage('secondLanguage', language)}
                                                    >
                                                    {language.fullName}
                                                </button>
                                    })
                                }
                            </div>
                        }
                        
                       
                    </div>
                </div>
           }
           
        </div>
    )
}